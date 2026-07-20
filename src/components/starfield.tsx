"use client";

import { useEffect, useRef } from "react";

type StarfieldProps = {
  className?: string;
  /** Stars per 10,000 px². */
  density?: number;
};

const palette = [
  "rgba(0, 172, 252, 0.85)",
  "rgba(0, 172, 252, 0.45)",
  "rgba(6, 222, 192, 0.55)",
  "rgba(255, 255, 255, 0.35)",
  "rgba(45, 83, 132, 0.9)",
];

/**
 * Static scattered-dot backdrop for dark sections, echoing the reference's
 * particle field. Drawn once per resize - zero per-frame cost.
 */
export function Starfield({ className, density = 0.55 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const count = Math.round(((rect.width * rect.height) / 10000) * density);
      // Deterministic pseudo-random so re-draws don't shimmer.
      let seed = 42;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };

      for (let i = 0; i < count; i++) {
        const x = rand() * rect.width;
        const y = rand() * rect.height;
        const r = rand() < 0.85 ? 0.8 : 1.4;
        ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
        ctx.globalAlpha = 0.25 + rand() * 0.75;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    draw();

    return () => resizeObserver.disconnect();
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      aria-hidden
    />
  );
}
