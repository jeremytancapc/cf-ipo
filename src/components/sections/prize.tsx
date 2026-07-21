"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { MarketCurve } from "../charts/market-curve";
import { useStat } from "@/lib/use-table";

gsap.registerPlugin(ScrollTrigger);

/** Market opportunity: TAM counter, growth curve, captured-share bar - on blue. */
export function Prize() {
  const tam = useStat("tam_2031");
  const captured = useStat("market_captured");
  const cagr = useStat("sector_cagr");
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-captured-bar]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "expo.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: "[data-captured]", start: "top 80%", once: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const capturedPct = captured?.value ?? 2.5;

  return (
    <section
      ref={rootRef}
      data-nav-theme="dark"
      className="dark-section relative overflow-hidden bg-blue px-5 py-28 md:px-10 md:py-44"
    >
      <div className="relative">
        <SectionHeading
          index="06"
          eyebrow="The prize"
          tone="blue"
          title={
            <>
              A market growing <span className="accent-word">faster</span> than
              anyone can serve it.
            </>
          }
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="display flex items-baseline leading-none text-white">
              <span className="text-[clamp(3.5rem,9vw,8rem)]">
                <Counter
                  value={tam?.value ?? 4.5}
                  prefix="S$"
                  decimals={1}
                  duration={3.2}
                  ease="power1.out"
                />
              </span>
              <span className="text-[clamp(2rem,5vw,4.5rem)] text-teal">B</span>
            </div>
            <p className="mt-5 max-w-[38ch] leading-[1.7] text-white/80">
              Singapore&apos;s alternative-lending disbursement opportunity by 2031,
              growing at{" "}
              <span className="font-bold text-teal">
                {cagr?.value ?? 16.9}% CAGR
              </span>{" "}
              as digital platforms extend credit to the underserved.
            </p>

            <div data-captured className="mt-12">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-[10px] text-teal">
                  Captured by Capital C to date
                </span>
                <span className="text-sm font-bold text-white">{capturedPct}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/15">
                <div
                  data-captured-bar
                  className="h-full rounded-full bg-teal"
                  style={{ width: `${Math.min(capturedPct * 4, 100)}%` }}
                />
              </div>
              <p className="mt-3 text-[11.5px] text-white/60">
                {(100 - capturedPct).toFixed(1)}% of the market remains unclaimed.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" y={60}>
            <div className="rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_rgba(10,22,38,0.25)] md:p-9">
              <p className="eyebrow mb-6 text-[10px] text-ink-soft">
                SG alternative lending · total disbursement value · S$B
              </p>
              <MarketCurve />
              <p className="mt-4 text-[10.5px] leading-relaxed text-ink-soft/80">
                Source: Statista, alternative lending transaction value by segment,
                Singapore · Research and Markets, 2024 · Google, Temasek &amp; Bain
                e-Conomy SEA 2024
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
