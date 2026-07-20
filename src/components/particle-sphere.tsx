"use client";

import { useEffect, useRef } from "react";

type ParticleSphereProps = {
  className?: string;
  /** Radians per second of Y-axis rotation. */
  speed?: number;
};

type SpherePoint = {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
};

const POINT_COUNT = 2400;
const TILT = -0.35;

/** Smooth pseudo-noise over the sphere surface — picks the bright patches. */
function patchValue(x: number, y: number, z: number) {
  return (
    Math.sin(x * 2.1 + y * 1.3) * Math.cos(y * 1.7 - z * 2.3) +
    Math.sin(z * 3.1 + x * 0.7) * 0.5
  );
}

function buildPoints(): SpherePoint[] {
  const points: SpherePoint[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const v = patchValue(x, y, z);
    let color: string;
    if (v > 0.75) color = "#06dec0"; // teal patch
    else if (v > 0.15) color = "#00acfc"; // lighter blue
    else if (v > -0.5) color = "#2d5384"; // main blue
    else color = "#1b3252"; // dim navy
    points.push({ x, y, z, size: v > 0.75 ? 1.25 : 1, color });
  }
  return points;
}

/**
 * Rotating 3D particle sphere on a 2D canvas — the site's signature graphic,
 * modeled on the reference's WebGL globe. Dependency-free; pauses offscreen;
 * renders a single static frame under prefers-reduced-motion.
 */
export function ParticleSphere({ className, speed = 0.06 }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = buildPoints();
    const cosTilt = Math.cos(TILT);
    const sinTilt = Math.sin(TILT);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rotation = 0;
    let rafId = 0;
    let lastTime = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.485;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);

      // Rotate every point, then paint back hemisphere, sphere body, front hemisphere.
      const rotated: Array<{ px: number; py: number; pz: number; p: SpherePoint }> = [];
      for (const p of points) {
        const x1 = p.x * cosR + p.z * sinR;
        const z1 = -p.x * sinR + p.z * cosR;
        const y1 = p.y * cosTilt - z1 * sinTilt;
        const z2 = p.y * sinTilt + z1 * cosTilt;
        rotated.push({ px: x1, py: y1, pz: z2, p });
      }

      ctx.globalAlpha = 0.35;
      for (const r of rotated) {
        if (r.pz >= 0) continue;
        ctx.fillStyle = r.p.color;
        ctx.beginPath();
        ctx.arc(cx + r.px * radius, cy + r.py * radius, r.p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 0.96;
      ctx.fillStyle = "#0e1b2c";
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.985, 0, Math.PI * 2);
      ctx.fill();

      for (const r of rotated) {
        if (r.pz < 0) continue;
        // Front points fade slightly toward the rim for depth.
        ctx.globalAlpha = 0.45 + r.pz * 0.55;
        ctx.fillStyle = r.p.color;
        ctx.beginPath();
        ctx.arc(
          cx + r.px * radius,
          cy + r.py * radius,
          r.p.size * (0.8 + r.pz * 0.5),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (lastTime) rotation += ((time - lastTime) / 1000) * speed;
      lastTime = time;
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced || rafId || !isVisible) return;
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [speed]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
