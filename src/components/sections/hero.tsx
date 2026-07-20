"use client";

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

      // The copy starts ink-on-light, but the globe rises behind it as the
      // page scrolls, so it crossfades to white to stay legible once it's
      // sitting over the dark sphere instead of the light field.
      gsap.to("[data-hero-headline], [data-hero-copy]", {
        color: "#ffffff",
        ease: "none",
        scrollTrigger: { trigger: root, start: "15% top", end: "75% top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-nav-theme="light"
      className="relative flex min-h-svh flex-col overflow-hidden bg-[linear-gradient(180deg,#fafbfc_0%,#eef4f9_48%,#d8e4ef_100%)]"
    >
      {/* Film grain: strongest at the top, dissolving as the field deepens. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22160%22%20height=%22160%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3CfeColorMatrix%20type=%22saturate%22%20values=%220%22/%3E%3CfeComponentTransfer%3E%3CfeFuncA%20type=%22linear%22%20slope=%220.5%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')] [mask-image:linear-gradient(to_bottom,black_0%,rgb(0_0_0/0.55)_40%,transparent_78%)]"
      />

      {/* Blueprint grid: fine underwriting-graph lines, strongest at the top
          and dissolving before the sphere so the headline stays clean. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(16_29_44/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(16_29_44/0.07)_1px,transparent_1px)] [background-size:clamp(44px,6vw,76px)_clamp(44px,6vw,76px)] [mask-image:radial-gradient(120%_100%_at_50%_0%,black_30%,transparent_72%)]"
      />

      {/* Horizon fade: the hero field melts into navy-deep at the bottom edge,
          so the sphere and the next section share one continuous darkness. */}
      <div
        aria-hidden
        className="hero-horizon-fade pointer-events-none absolute inset-x-0 bottom-0 h-[38vw] md:h-[16vw]"
      />

      {/* Cresting particle sphere, pinned to the bottom edge */}
      <div
        data-hero-sphere
        className="pointer-events-none absolute -bottom-[66vw] left-1/2 aspect-square w-[100vw] -translate-x-1/2 opacity-0 will-change-transform md:-bottom-[61vw] md:w-[78vw]"
      >
        <ParticleSphere className="h-full w-full" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pt-12 pb-0 text-center md:pt-16 md:pb-8">
        <div
          data-hero-meta
          data-hero-copy
          className="eyebrow mb-9 flex flex-nowrap items-center justify-center gap-x-1.5 whitespace-nowrap text-[length:clamp(6.5px,2.5vw,10px)]! tracking-[0.1em]! text-ink-soft opacity-0 sm:gap-x-4 sm:tracking-[0.2em]! md:mb-6"
        >
          <span>Pre-IPO opportunity</span>
          <span className="text-sky">·</span>
          <span>Targeting 2027 SGX Catalist listing</span>
        </div>

        <h1
          data-hero-headline
          className="display text-[length:clamp(2.6rem,7.8vw,5rem)] text-ink md:text-[length:clamp(2.6rem,5.2vw,3.75rem)]"
        >
          <span data-hero-line className="block overflow-hidden pb-[0.18em]">
            <span className="block will-change-transform">We lend by</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.18em]">
            <span className="block will-change-transform">
              <span className="accent-word accent-word--sky">intelligence</span>, not
            </span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.18em]">
            <span className="block will-change-transform">guesswork.</span>
          </span>
        </h1>

        <p
          data-hero-meta
          data-hero-copy
          className="mt-9 max-w-[46ch] text-base leading-relaxed text-ink-soft opacity-0 md:mt-4 md:max-w-[50ch] md:text-base"
        >
          CF Money is the AI-native lender for the underserved, a full suite of
          digital lending platforms built by Capital C Corporation.
        </p>

        <div data-hero-meta className="mt-10 flex items-center gap-4 opacity-0 md:mt-6">
          <a href="#shift" className="pill pill--glass">
            Explore <span aria-hidden>↓</span>
          </a>
        </div>
      </div>

      {/* Corner link */}
      <div className="relative z-10 flex items-center justify-end px-5 pb-8 md:px-10">
        <a
          data-hero-meta
          href="/financials"
          className="link-underline text-teal opacity-0"
        >
          Deep dive into the numbers
        </a>
      </div>
    </section>
  );
}
