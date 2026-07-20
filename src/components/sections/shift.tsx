"use client";

import { useLayoutEffect, useRef } from "react";
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
    card: "bg-slate-200",
  },
  {
    n: "Gen 2",
    name: "The web form",
    era: "Current industry",
    body: "Apply online, upload documents, and wait hours, or days.",
    card: "bg-sky-100",
  },
];

const genThree = [
  "We know when you need it, before you ask",
  "Just text us to get a loan",
  "An AI agent handles the entire process",
  "Funds arrive in minutes, not days",
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
          {/* Ambient glow: anchored on Gen 3 below, but tall and strong
              enough to bleed up behind the legacy cards too, so the whole
              stack reads as building toward it. Sits at z-0, under both the
              legacy cards and the Gen 3 card, both promoted to z-10. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-16 bottom-0 z-0 rounded-[3rem] bg-white/45 blur-[110px] md:inset-x-16 md:-top-24"
          />

          <div className="relative z-10 mt-16 grid gap-5 md:mt-24 md:grid-cols-2">
            {generations.map((g) => (
              <Reveal
                key={g.n}
                className={`rounded-[2rem] px-7 py-10 md:px-10 md:py-12 ${g.card}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow rounded-full border border-navy-deep/15 px-3 py-1.5 text-[9.5px] text-navy-deep/70">
                    {g.n}
                  </span>
                  <span className="eyebrow text-[9px] text-navy-deep/45">{g.era}</span>
                </div>
                <h3 className="display mt-9 text-[length:var(--text-h3)] text-navy-deep/80">
                  {g.name}
                </h3>
                <p className="mt-4 max-w-[38ch] leading-relaxed text-navy-deep/60">{g.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Generation 3 - the statement card. Teal (not blue, like the
              legacy generations above) since this is the future the
              section is building toward. */}
          <div
            data-gen3
            className="relative z-10 mt-5 overflow-hidden rounded-[2rem] bg-teal px-7 py-14 md:px-12 md:py-20"
          >
            {/* Grain: breaks up the flat teal fill so it reads as a
                textured surface rather than a plain block of color. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22160%22%20height=%22160%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3CfeColorMatrix%20type=%22saturate%22%20values=%220%22/%3E%3CfeComponentTransfer%3E%3CfeFuncA%20type=%22linear%22%20slope=%220.65%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
            />
            <div className="relative grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow rounded-full bg-navy-deep px-3.5 py-2 text-[9.5px] text-teal">
                    Gen 3
                  </span>
                  <span className="eyebrow text-[9px] text-navy-deep/70">
                    AI-native
                  </span>
                </div>
                <h3 className="display mt-8 text-[length:var(--text-h3)] text-navy-deep">
                  The <span className="accent-word accent-word--ink">conversation</span>
                </h3>
                <p className="mt-4 max-w-[36ch] leading-[1.75] text-navy-deep/75">
                  Technology isn&apos;t our enabler, it is the product. AI drives every
                  decision, from acquisition to collections.
                </p>
              </div>
              <ul className="space-y-5 self-center md:col-span-6 md:col-start-7">
                {genThree.map((line) => (
                  <li
                    key={line}
                    data-gen3-line
                    className="flex items-baseline gap-4 text-lg font-medium text-navy-deep md:text-xl"
                  >
                    <span className="shrink-0 text-navy-deep/60" aria-hidden>
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
