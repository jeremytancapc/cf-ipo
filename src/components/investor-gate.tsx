"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "cf-money-ai-ack";

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

// Server renders "acknowledged" so the gate only appears after hydration,
// avoiding a mismatch and any flash for returning visitors.
function getServerSnapshot() {
  return true;
}

function acknowledge() {
  localStorage.setItem(STORAGE_KEY, "1");
  listeners.forEach((l) => l());
}

/**
 * First-visit accredited-investor acknowledgement splash.
 * Persisted in localStorage so returning visitors go straight in.
 */
export function InvestorGate() {
  const hasAcknowledged = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (hasAcknowledged) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasAcknowledged]);

  if (hasAcknowledged) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      className="fixed inset-0 z-100 flex items-center justify-center bg-blue px-5"
    >
      <div className="w-full max-w-2xl">
        <p className="eyebrow text-teal">Before you enter</p>
        <h2
          id="gate-title"
          className="display mt-6 text-4xl text-white md:text-6xl"
        >
          For <span className="accent-word">Accredited</span> Investors only.
        </h2>
        <p className="mt-7 max-w-[62ch] text-[13.5px] leading-[1.85] text-white/75">
          This site is strictly for information purposes and does not constitute
          financial advice, nor an offer or solicitation to deal in any security,
          fund, product or service. It has not been reviewed by the MAS and should
          not be used in place of an actual prospectus. The information is intended
          only for persons who qualify as &ldquo;Accredited Investors&rdquo; under
          the Securities and Futures Act (Chapter 289) of Singapore.
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="pill pill--teal mt-10"
        >
          I understand, I am an Accredited Investor
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
