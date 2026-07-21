"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { Starfield } from "../starfield";
import { useStat } from "@/lib/use-table";

const steps = [
  {
    n: "01",
    title: "Signals",
    body: "Transaction patterns, cash-flow dips, life events, seasonality, analysed continuously.",
  },
  {
    n: "02",
    title: "AI engine",
    body: "Predicts a loan need 2-4 weeks before the customer realises it themselves.",
  },
  {
    n: "03",
    title: "Personalised offer",
    body: "A tailored amount, term and rate, delivered on the right channel at the right moment.",
  },
  {
    n: "04",
    title: "One-click acceptance",
    body: "The customer says yes. Funds arrive in minutes, not days.",
  },
];

/** Step 01 – Signals: sonar-ping rings radiating from a data dot,
 *  conveying continuous monitoring of transaction patterns. */
function SignalsIcon() {
  return (
    <svg viewBox="0 0 96 72" className="h-14 w-auto" fill="none" aria-hidden>
      {/* Three sonar rings that expand and fade in sequence */}
      <circle className="step-ping-ring" cx={44} cy={36} r={10} stroke="var(--color-teal)" strokeWidth={1.5} />
      <circle className="step-ping-ring" cx={44} cy={36} r={10} stroke="var(--color-teal)" strokeWidth={1} opacity={0.6} />
      <circle className="step-ping-ring" cx={44} cy={36} r={10} stroke="var(--color-sky)" strokeWidth={1} opacity={0.4} />
      {/* Static inner arc suggesting direction */}
      <path d="M30 24 A19 19 0 0 1 58 24" stroke="var(--color-sky)" strokeWidth={1.5} strokeLinecap="round" opacity={0.4} />
      {/* Central data dot */}
      <circle cx={44} cy={36} r={3} fill="var(--color-teal)" />
      {/* Small blinking activity dots representing incoming data */}
      <circle className="step-blink" cx={20} cy={20} r={2} fill="var(--color-sky)" opacity={0.7} />
      <circle className="step-blink-delay" cx={72} cy={22} r={1.5} fill="var(--color-teal)" opacity={0.6} />
      <circle className="step-blink" cx={66} cy={52} r={1.5} fill="var(--color-sky)" opacity={0.5} />
    </svg>
  );
}

/** Step 02 – AI engine: a central chip with satellite nodes orbiting it,
 *  conveying the prediction model that processes the incoming signals. */
function EngineIcon() {
  return (
    <svg viewBox="0 0 96 72" className="h-14 w-auto" fill="none" aria-hidden>
      {/* Central hexagonal chip */}
      <polygon
        points="48,16 62,24 62,40 48,48 34,40 34,24"
        stroke="var(--color-teal)"
        strokeWidth={1.5}
      />
      {/* Inner cross — the processor grid */}
      <line x1={34} y1={32} x2={62} y2={32} stroke="var(--color-teal)" strokeWidth={1} opacity={0.35} />
      <line x1={48} y1={16} x2={48} y2={48} stroke="var(--color-teal)" strokeWidth={1} opacity={0.35} />
      {/* Centre dot */}
      <circle cx={48} cy={32} r={2.5} fill="var(--color-teal)" />
      {/* Orbiting satellite group */}
      <g className="step-orbit-group" style={{ transformOrigin: "48px 32px" }}>
        {/* Orbit path (dim) */}
        <circle cx={48} cy={32} r={20} stroke="var(--color-sky)" strokeWidth={1} opacity={0.18} strokeDasharray="3 4" />
        {/* Node A */}
        <line x1={48} y1={32} x2={68} y2={32} stroke="var(--color-sky)" strokeWidth={1} opacity={0.4} />
        <circle cx={68} cy={32} r={3} fill="none" stroke="var(--color-sky)" strokeWidth={1.5} />
        {/* Node B */}
        <line x1={48} y1={32} x2={34} y2={13} stroke="var(--color-sky)" strokeWidth={1} opacity={0.4} />
        <circle cx={34} cy={13} r={2.5} fill="var(--color-sky)" opacity={0.7} />
        {/* Node C */}
        <line x1={48} y1={32} x2={34} y2={51} stroke="var(--color-sky)" strokeWidth={1} opacity={0.4} />
        <circle cx={34} cy={51} r={2.5} fill="none" stroke="var(--color-teal)" strokeWidth={1.5} />
      </g>
    </svg>
  );
}

/** Step 03 – Personalised offer: a message bubble being composed,
 *  with a small percent tag inside — the right offer at the right moment. */
function OfferIcon() {
  /* Bubble perimeter ≈ 220 to match the step-draw keyframe dasharray. */
  return (
    <svg viewBox="0 0 96 72" className="h-14 w-auto" fill="none" aria-hidden>
      {/* Target ring behind the bubble — "sent to you specifically" */}
      <circle cx={48} cy={33} r={26} stroke="var(--color-sky)" strokeWidth={1} opacity={0.2} strokeDasharray="4 5" />
      {/* Static bubble outline (always visible as base) */}
      <rect x={18} y={14} width={52} height={36} rx={9} stroke="var(--color-teal)" strokeWidth={1.5} opacity={0.25} />
      {/* Animated draw loop over the bubble outline */}
      <rect
        className="step-draw-path"
        x={18} y={14} width={52} height={36} rx={9}
        stroke="var(--color-teal)" strokeWidth={1.5}
      />
      {/* Tail */}
      <path d="M30 50 L24 60 L40 50" stroke="var(--color-teal)" strokeWidth={1.5} strokeLinejoin="round" opacity={0.5} />
      {/* Percent symbol — large and centred, the personalised rate */}
      <text x={44} y={33} textAnchor="middle" dominantBaseline="central" fontFamily="monospace" fontSize={26} fontWeight={700} fill="var(--color-sky)" opacity={0.95}>%</text>
    </svg>
  );
}

/** Step 04 – One-click acceptance: a checkmark drawing itself inside
 *  a circle, with a tap-ripple, conveying instant approval and funds. */
function AcceptIcon() {
  return (
    <svg viewBox="0 0 96 72" className="h-14 w-auto" fill="none" aria-hidden>
      {/* Ripple rings from the tap point */}
      <circle className="step-ripple-circle" cx={48} cy={33} r={8} stroke="var(--color-teal)" strokeWidth={1.5} />
      <circle className="step-ripple-circle" cx={48} cy={33} r={8} stroke="var(--color-sky)" strokeWidth={1} />
      {/* Outer circle (always present) */}
      <circle cx={48} cy={33} r={22} stroke="var(--color-sky)" strokeWidth={1.5} opacity={0.4} />
      {/* Checkmark — draws itself on loop */}
      <polyline
        className="step-check-path"
        points="34,33 44,43 62,23"
        stroke="var(--color-teal)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Map from step index to its icon component. */
const stepIcons = [SignalsIcon, EngineIcon, OfferIcon, AcceptIcon];

/** Small inline teal lightning-bolt used to flag the USP statement. */
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 18"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 0L0 10h5l-1 8 8-11H7L8 0z" />
    </svg>
  );
}

/** Proactive lending flow on the starfield. */
export function HowItWorks() {
  const conversion = useStat("conversion_multiple");

  return (
    <section
      data-nav-theme="dark"
      className="dark-section space-section relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield density={0.45} />

      <div className="relative">
        <SectionHeading
          index="02"
          eyebrow="Proactive lending"
          tone="space"
          title={
            <>
              We offer credit <span className="accent-word">before</span> the
              customer asks.
            </>
          }
        />

        <Reveal
          stagger
          className="mt-16 grid gap-y-14 md:mt-24 md:grid-cols-4 md:gap-x-10"
        >
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
            <div key={s.n}>
              <Icon />
              <div className="eyebrow mt-7 text-[9.5px] text-teal">
                Step {s.n}
              </div>
              <h3 className="display mt-3 text-2xl text-white md:text-[1.7rem]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.75] text-white/65">
                {s.body}
              </p>
            </div>
            );
          })}
        </Reveal>

        <Reveal className="relative mt-20 flex flex-col gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-7 py-10 backdrop-blur-sm md:mt-28 md:flex-row md:items-end md:justify-between md:px-12 md:py-14">
          <div>
            <div className="display relative inline-flex items-baseline text-[clamp(4rem,10vw,8.5rem)] leading-none text-white">
              {/* Teal pulse rings radiating from the centre of the 3x
                  outward into the card (clipped by the card's rounded
                  overflow-hidden bounds). */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <span className="stat-pulse-ring" />
                <span className="stat-pulse-ring" />
                <span className="stat-pulse-ring" />
              </div>
              <Counter
                value={conversion?.value ?? 3}
                decimals={conversion?.decimals ?? 0}
                duration={1.2}
              />
              <span className="text-teal">×</span>
            </div>
            <p className="eyebrow relative mt-5 text-[10px] text-white/60">
              higher conversion vs. traditional marketing campaigns
            </p>
          </div>
          <blockquote className="relative max-w-[40ch] border-l-2 border-teal/50 pl-6 md:border-l-0 md:border-r-2 md:pl-0 md:pr-6 md:text-right">
            <p className="leading-[1.8] text-white/70">
              Not online forms waiting to be filled in, but a relationship
              manager that reaches out first{" "}
              <span className="whitespace-nowrap">
                <BoltIcon className="mr-0.5 inline h-[0.85em] w-auto align-[-0.1em] text-teal" />
                <span className="font-semibold text-white underline decoration-teal decoration-2 [text-underline-offset:0.3em]">
                  powered
                </span>
              </span>{" "}
              <span className="font-semibold text-white underline decoration-teal decoration-2 [text-underline-offset:0.3em]">
                by data no competitor holds
              </span>
              .
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
