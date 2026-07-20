"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Starfield } from "../starfield";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { q: "Q1 2026", what: "Mobile app & revolving credit", ai: "Digital channel launch" },
  { q: "Q2 2026", what: "AI credit scoring v1.0", ai: "30% fewer defaults" },
  { q: "Q3 2026", what: "Loan aggregator + AI documents", ai: "80% auto-processing" },
  { q: "Q4 2026", what: "Mobile lending PH + text-to-loan", ai: "New market, new UX" },
  { q: "Q1 2027", what: "Platform expansion + AI agent v1.0", ai: "PH & MY markets live" },
  { q: "Q2 2027", what: "Proactive lending & AI CX", ai: "3× conversion rates" },
  { q: "Q3 2027", what: "Full AI agent + auto collections", ai: "95% automation" },
  { q: "Q4 2027", what: "AI-native ops & regional scale", ai: "Regional leadership" },
];

const expansion = [
  { market: "Singapore", when: "Today", state: "live" },
  { market: "Philippines", when: "Q4 2027", state: "next" },
  { market: "Malaysia", when: "Q4 2028", state: "planned" },
  { market: "India", when: "Q4 2030", state: "planned" },
];

/** Milestone timeline with a scroll-scrubbed progress spine + expansion strip. */
export function Roadmap() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="roadmap"
      data-nav-theme="dark"
      className="dark-section space-section relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield />

      <div className="relative">
        <SectionHeading
          index="09"
          eyebrow="What's next"
          tone="space"
          title={
            <>
              Eight quarters to <span className="accent-word">listing.</span>
            </>
          }
        />

        <div data-timeline className="relative mt-16 md:mt-24">
          {/* progress spine */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/12 md:left-1/2" />
          <div
            data-spine
            className="absolute bottom-0 left-[7px] top-0 w-px bg-teal md:left-1/2"
          />

          <div className="space-y-10 md:space-y-0">
            {milestones.map((m, i) => (
              <Reveal
                key={m.q}
                y={30}
                className={`relative pl-10 md:grid md:grid-cols-2 md:pl-0 ${
                  i > 0 ? "md:-mt-2" : ""
                }`}
              >
                <div
                  className={`md:px-12 md:py-6 ${i % 2 === 0 ? "" : "md:col-start-2"}`}
                >
                  {/* node */}
                  <span className="absolute left-[3px] top-1 h-[9px] w-[9px] rounded-full bg-teal shadow-[0_0_12px_rgba(6,222,192,0.8)] md:left-1/2 md:top-8 md:-translate-x-1/2" />
                  <div className={`${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <span className="eyebrow text-[10px] text-teal">{m.q}</span>
                    <h3 className="mt-2.5 text-lg font-bold text-white md:text-xl">
                      {m.what}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] font-medium text-white/55">
                      {m.ai}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Regional expansion strip */}
        <Reveal
          stagger
          className="mt-24 grid grid-cols-2 gap-5 md:mt-32 md:grid-cols-4"
        >
          {expansion.map((e) => (
            <div
              key={e.market}
              className="rounded-[1.75rem] border border-white/12 bg-white/5 px-6 py-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    e.state === "live"
                      ? "bg-teal shadow-[0_0_10px_rgba(6,222,192,0.9)]"
                      : e.state === "next"
                        ? "bg-teal/50"
                        : "bg-white/25"
                  }`}
                />
                <span className="eyebrow text-[10px] text-white/60">{e.when}</span>
              </div>
              <h3 className="display mt-4 text-xl text-white md:text-2xl">
                {e.market}
              </h3>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
