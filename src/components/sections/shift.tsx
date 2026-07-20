"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Starfield } from "../starfield";

gsap.registerPlugin(ScrollTrigger);

const generations = [
  {
    n: "Gen 1",
    name: "The branch",
    era: "Traditional",
    body: "Walk into a branch, fill in forms, and wait days for approval.",
  },
  {
    n: "Gen 2",
    name: "The web form",
    era: "Current industry",
    body: "Apply online, upload documents, and wait hours — or days.",
  },
];

const genThree = [
  "We know when you need it, before you ask",
  "Just text us to get a loan",
  "An AI agent handles the entire process",
  "Funds arrive in minutes, not days",
];

/** Three generations of lending — CF Money framed as Generation 3. */
export function Shift() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-gen3-line]", { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(
        "[data-gen3-line]",
        { autoAlpha: 0, x: -28 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-gen3]", start: "top 75%", once: true },
        }
      );
    }, root);
    return () => ctx.revert();
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

        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2">
          {generations.map((g) => (
            <Reveal
              key={g.n}
              className="rounded-[2rem] border border-white/10 bg-white/5 px-7 py-10 backdrop-blur-sm md:px-10 md:py-12"
            >
              <div className="flex items-baseline justify-between">
                <span className="eyebrow rounded-full border border-white/25 px-3 py-1.5 text-[9.5px] text-white/70">
                  {g.n}
                </span>
                <span className="eyebrow text-[9px] text-white/45">{g.era}</span>
              </div>
              <h3 className="display mt-9 text-[length:var(--text-h3)] text-white/70">
                {g.name}
              </h3>
              <p className="mt-4 max-w-[38ch] leading-relaxed text-white/60">{g.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Generation 3 — the statement card */}
        <div
          data-gen3
          className="relative mt-5 overflow-hidden rounded-[2rem] bg-blue px-7 py-14 md:px-12 md:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-14 right-2 select-none text-[clamp(9rem,24vw,22rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.18)]"
          >
            3
          </div>
          <div className="relative grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow rounded-full bg-teal px-3.5 py-2 text-[9.5px] text-navy-deep">
                  Gen 3
                </span>
                <span className="eyebrow text-[9px] text-white/70">
                  CF Money — AI-native
                </span>
              </div>
              <h3 className="display mt-8 text-[length:var(--text-h3)] text-white">
                The <span className="accent-word">conversation</span>
              </h3>
              <p className="mt-4 max-w-[36ch] leading-[1.75] text-white/75">
                Technology isn&apos;t our enabler — it is the product. AI drives every
                decision, from acquisition to collections.
              </p>
            </div>
            <ul className="space-y-5 self-center md:col-span-6 md:col-start-7">
              {genThree.map((line) => (
                <li
                  key={line}
                  data-gen3-line
                  className="flex items-baseline gap-4 text-lg font-medium text-white opacity-0 md:text-xl"
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
    </section>
  );
}
