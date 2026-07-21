"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
  /** GSAP easing name. Defaults to "expo.out"; use something flatter (e.g. "power1.out") for small values that would otherwise look done almost instantly. */
  ease?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-SG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Number that counts up from 0 when scrolled into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 1.8,
  ease = "expo.out",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = format(value, decimals);
      return;
    }

    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value,
        duration,
        ease,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = format(state.n, decimals);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, decimals, duration, ease]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{format(0, decimals)}</span>
      {suffix}
    </span>
  );
}
