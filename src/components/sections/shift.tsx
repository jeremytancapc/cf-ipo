"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Starfield } from "../starfield";

const generations = [
  {
    n: "Gen 1",
    name: "The branch",
    era: "Traditional",
    body: "Walk into a branch, fill in forms, and wait days for approval.",
    card: "card-gen1",
    badgeBorder: "border-[#d6be94]/30",
    badgeText: "text-[#e6d7b8]/80",
    eraText: "text-[#d6be94]/55",
    headingText: "text-[#f0e6d2]",
    bodyText: "text-[#dccdae]/75",
  },
  {
    n: "Gen 2",
    name: "The web form",
    era: "Current industry",
    body: "Apply online, upload documents, and wait hours, or days.",
    card: "card-gen2",
    badgeBorder: "border-white/30",
    badgeText: "text-white/85",
    eraText: "text-white/55",
    headingText: "text-white",
    bodyText: "text-white/70",
  },
];

const genThree = [
  "We know when you need it, before you ask",
  "Just text us to get a loan",
  "An AI agent handles the entire process",
  "Funds arrive in minutes, not days",
];

/** Data-signal pulses for the Gen 3 card: each travels a straight run
 * along one grid axis (dx or dy, in multiples of the 42px grid cell) in
 * its own direction, speed, and delay, so the circuit grid reads as many
 * independent signals in motion rather than one sweeping beam. Positions
 * and directions are hand-picked (not Math.random) to stay deterministic
 * across server/client renders. */
const gen3Pulses: Array<{
  top: string;
  left: string;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  tone?: "teal" | "sky";
}> = [
  { top: "16%", left: "-3%", dx: 210, dy: 0, duration: 4.6, delay: 0, tone: "teal" },
  { top: "38%", left: "103%", dx: -252, dy: 0, duration: 5.4, delay: 1.3, tone: "sky" },
  { top: "62%", left: "-3%", dx: 168, dy: 0, duration: 3.9, delay: 2.6, tone: "teal" },
  { top: "-3%", left: "22%", dx: 0, dy: 210, duration: 5.1, delay: 0.7, tone: "sky" },
  { top: "103%", left: "54%", dx: 0, dy: -252, duration: 4.3, delay: 1.9, tone: "teal" },
  { top: "-3%", left: "78%", dx: 0, dy: 168, duration: 6.2, delay: 3.1, tone: "sky" },
  { top: "84%", left: "-3%", dx: 126, dy: 0, duration: 4.0, delay: 3.7, tone: "teal" },
  { top: "-3%", left: "40%", dx: 0, dy: 294, duration: 5.3, delay: 4.4, tone: "sky" },
  { top: "26%", left: "103%", dx: -168, dy: 0, duration: 4.8, delay: 2.1, tone: "teal" },
  { top: "-3%", left: "62%", dx: 0, dy: 252, duration: 5.7, delay: 0.2, tone: "sky" },
];

/** Three generations of lending - CF Money framed as Generation 3. */
export function Shift() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-gen3-line]"));
    if (lines.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(lines, { autoAlpha: 1 });
      return;
    }

    // Driven by IntersectionObserver rather than ScrollTrigger: this card
    // can be reached by a direct/programmatic jump that bypasses Lenis
    // (an anchor jump, or a dev-tool scroll-into-view) without ever firing
    // a scroll event ScrollTrigger would need to recalculate against, which
    // left these lines stranded invisible. IntersectionObserver reacts to
    // actual on-screen visibility regardless of what caused the scroll.
    gsap.set(lines, { autoAlpha: 0, x: -28 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = lines.indexOf(entry.target as HTMLElement);
          gsap.to(entry.target, {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            delay: Math.max(index, 0) * 0.12,
            ease: "expo.out",
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="shift"
      data-nav-theme="dark"
      className="dark-section space-section-flow relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield />

      <div className="relative">
        <SectionHeading
          index="01"
          eyebrow="The shift"
          tone="space"
          title={
            <>
              Lending is entering its <span className="accent-word">third</span>{" "}
              generation.
            </>
          }
        />

        <div className="relative">
          {/* Teal ambient glow: anchored behind Gen 3 so it bleeds upward as a
              directional cue — the future card radiates energy toward the past
              cards above it. Much dimmer than the previous white bloom so it
              doesn't overpower the new glassmorphism fills. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-0 top-1/3 z-0 rounded-[3rem] blur-[100px] md:inset-x-16"
            style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(6,222,192,0.18) 0%, rgba(0,172,252,0.10) 50%, transparent 80%)" }}
          />

          <div className="relative z-10 mt-16 grid gap-5 md:mt-24 md:grid-cols-2">
            {generations.map((g) => (
              <Reveal
                key={g.n}
                className={`rounded-[2rem] px-7 py-10 md:px-10 md:py-12 ${g.card}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className={`eyebrow rounded-full border px-3 py-1.5 text-[9.5px] ${g.badgeBorder} ${g.badgeText}`}>
                    {g.n}
                  </span>
                  <span className={`eyebrow text-[9px] ${g.eraText}`}>{g.era}</span>
                </div>
                <h3 className={`display mt-9 text-[clamp(1.75rem,3vw,2.6rem)] ${g.headingText}`}>
                  {g.name}
                </h3>
                <p className={`mt-4 max-w-[38ch] leading-relaxed ${g.bodyText}`}>{g.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Generation 3 - the showpiece card. Dark glass with animated
              teal border, aurora blobs, and light-on-dark text. */}
          <div
            data-gen3
            className="card-gen3 relative z-10 mt-5 overflow-hidden rounded-[2rem] px-7 py-14 md:px-12 md:py-20"
          >
            {/* Aurora blob A — teal, drifts slowly upper-right */}
            <div
              aria-hidden
              className="aurora-a pointer-events-none absolute -left-16 -top-16 h-80 w-80 rounded-full opacity-25"
              style={{
                background: "radial-gradient(circle, rgba(6,222,192,0.75) 0%, transparent 70%)",
                filter: "blur(48px)",
                animation: "aurora-drift-a 14s ease-in-out infinite",
              }}
            />
            {/* Aurora blob B — sky, drifts slowly lower-right */}
            <div
              aria-hidden
              className="aurora-b pointer-events-none absolute -bottom-10 right-0 h-96 w-96 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(0,172,252,0.70) 0%, transparent 70%)",
                filter: "blur(60px)",
                animation: "aurora-drift-b 18s ease-in-out infinite",
              }}
            />
            {/* Data-signal pulses: small lights traveling along the circuit
                grid (added via .card-gen3::after) in varied directions and
                speeds, to signify live data in motion — the AI core that's
                always working. */}
            {gen3Pulses.map((p, i) => (
              <span
                key={i}
                aria-hidden
                className={`gen3-pulse ${p.tone === "sky" ? "gen3-pulse--sky" : ""}`}
                style={
                  {
                    top: p.top,
                    left: p.left,
                    "--gen3-pulse-dx": `${p.dx}px`,
                    "--gen3-pulse-dy": `${p.dy}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
            {/* Grain: subtle texture over dark glass — overlay mode preserves
                the glassmorphism feel rather than darkening with multiply. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22160%22%20height=%22160%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3CfeColorMatrix%20type=%22saturate%22%20values=%220%22/%3E%3CfeComponentTransfer%3E%3CfeFuncA%20type=%22linear%22%20slope=%220.65%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
            />
            <div className="relative grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow rounded-full border border-teal/40 bg-teal/10 px-3.5 py-2 text-[9.5px] text-teal">
                    Gen 3
                  </span>
                  <span className="eyebrow text-[9px] text-teal/60">
                    AI-native
                  </span>
                </div>
                <h3 className="display mt-8 text-[clamp(2.3rem,4.2vw,3.75rem)] text-white">
                  The <span className="accent-word">conversation</span>
                </h3>
                <p className="mt-4 max-w-[36ch] leading-[1.75] text-white/65">
                  Technology isn&apos;t our enabler, it is the product. AI drives every
                  decision, from acquisition to collections.
                </p>
              </div>
              <ul className="space-y-5 self-center md:col-span-6 md:col-start-7">
                {genThree.map((line) => (
                  <li
                    key={line}
                    data-gen3-line
                    className="flex items-baseline gap-4 text-lg font-medium text-white/90 md:text-xl"
                  >
                    <span className="shrink-0 text-teal" aria-hidden>
                      →
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
