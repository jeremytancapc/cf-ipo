"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds to delay after the trigger fires. */
  delay?: number;
  /** Distance in px the element travels upward. */
  y?: number;
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: boolean;
};

/** Fades + slides content up when it scrolls into view. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  delay = 0,
  y = 44,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "expo.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
