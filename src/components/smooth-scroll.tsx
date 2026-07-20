"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling wired into GSAP's ScrollTrigger ticker. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.95 });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis owns the scroll position, so same-page anchor jumps must go
    // through it - otherwise it snaps back on the next frame.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
