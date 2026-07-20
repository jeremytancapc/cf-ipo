"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleSphere } from "../particle-sphere";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero-meta], [data-hero-sphere]", { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hero-line] > span",
        { yPercent: 112 },
        { yPercent: 0, duration: 1.5, stagger: 0.13, delay: 0.15 }
      )
        .fromTo(
          "[data-hero-sphere]",
          { yPercent: 45, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.8 },
          "-=1.3"
        )
        .fromTo(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 },
          "-=1.4"
        );

      // The globe expands as the hero scrolls out, so its dark disk grows past
      // the viewport edges and flows seamlessly into the section below.
      gsap.to("[data-hero-sphere]", {
        scale: 2.4,
        y: -120,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-headline]", {
        yPercent: 24,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-nav-theme="dark"
      className="relative flex min-h-svh flex-col overflow-hidden bg-blue"
    >
      {/* Horizon fade: the hero field melts into navy-deep at the bottom edge,
          so the sphere and the next section share one continuous darkness. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vw] bg-gradient-to-b from-transparent to-navy-deep md:h-[22vw]"
      />

      {/* Cresting particle sphere, pinned to the bottom edge */}
      <div
        data-hero-sphere
        className="pointer-events-none absolute -bottom-[66vw] left-1/2 aspect-square w-[100vw] -translate-x-1/2 opacity-0 will-change-transform md:-bottom-[54vw] md:w-[78vw]"
      >
        <ParticleSphere className="h-full w-full" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pt-28 text-center">
        <div
          data-hero-meta
          className="eyebrow mb-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-white/75 opacity-0"
        >
          <span>Pre-IPO opportunity</span>
          <span className="text-teal">·</span>
          <span>Targeting 2027 SGX Catalist listing</span>
        </div>

        <h1
          data-hero-headline
          className="display text-[length:var(--text-hero)] text-white"
        >
          {["Lending at", "the speed of"].map((line) => (
            <span key={line} data-hero-line className="block overflow-hidden pb-[0.06em]">
              <span className="block will-change-transform">{line}</span>
            </span>
          ))}
          <span data-hero-line className="block overflow-hidden pb-[0.12em]">
            <span className="block will-change-transform">
              <span className="accent-word">intelligence.</span>
            </span>
          </span>
        </h1>

        <p
          data-hero-meta
          className="mt-9 max-w-[46ch] text-base leading-relaxed text-white/80 opacity-0 md:text-lg"
        >
          CF Money is the AI-native lender for the underserved — a full suite of
          digital lending platforms built by Capital C Corporation.
        </p>

        <div data-hero-meta className="mt-10 flex items-center gap-4 opacity-0">
          <a href="#shift" className="pill pill--outline">
            Explore <span aria-hidden>↓</span>
          </a>
          <Link href="/financials" className="pill pill--teal">
            The numbers
          </Link>
        </div>
      </div>

      {/* Corner links */}
      <div className="relative z-10 flex items-center justify-between px-5 pb-8 md:px-10">
        <a
          data-hero-meta
          href="/financials"
          className="link-underline text-teal opacity-0"
        >
          Read the numbers
        </a>
        <a
          data-hero-meta
          href="#contact"
          className="link-underline text-teal opacity-0"
        >
          Contact us
        </a>
      </div>
    </section>
  );
}
