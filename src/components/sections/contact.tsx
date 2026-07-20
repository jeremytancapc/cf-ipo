"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Reveal } from "../reveal";
import { Starfield } from "../starfield";
import { submitContact, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { status: "idle" };

const channels = [
  { label: "Email us", value: "ipo@capc.com.sg", href: "mailto:ipo@capc.com.sg" },
  { label: "Call us", value: "+65 9191 9191", href: "tel:+6591919191" },
  {
    label: "WhatsApp us",
    value: "wa.me/6591919191",
    href: "https://wa.me/6591919191",
    external: true,
  },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-[11.5px] font-semibold text-teal">{message}</p>;
}

/** Closing contact section: on-page form + direct channels, on the starfield. */
export function Contact() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="dark-section space-section relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield />

      <div className="relative grid gap-16 md:grid-cols-12">
        {/* Left: pitch + direct channels */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-teal">Speak to the team</p>
            <h2 className="display mt-7 text-[length:var(--text-h2)] text-white">
              Ready for a<br />
              <span className="accent-word">conversation?</span>
            </h2>
            <p className="mt-7 max-w-[42ch] leading-[1.75] text-white/70">
              Let us understand your investment objectives and walk you through the
              CF Money pre-IPO opportunity, or go straight to the data room.
            </p>
            <Link href="/financials" className="pill pill--outline mt-8">
              The numbers <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal className="mt-14 space-y-7">
            {channels.map((c) => (
              <div key={c.href}>
                <p className="eyebrow text-[9.5px] text-white/50">{c.label}</p>
                <a
                  href={c.href}
                  className="link-underline mt-2 inline-block text-[13px] tracking-[0.14em] text-teal"
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.value}
                </a>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Right: the form */}
        <Reveal className="md:col-span-6 md:col-start-7" y={56}>
          {state.status === "success" ? (
            <div className="flex h-full flex-col justify-center rounded-[2rem] border border-teal/40 bg-white/5 px-8 py-14 backdrop-blur-sm md:px-12">
              <p className="display text-3xl text-teal md:text-4xl">
                Thank you.
              </p>
              <p className="mt-5 max-w-[44ch] leading-[1.75] text-white/75">
                {state.message}
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-9">
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <input
                    name="first_name"
                    placeholder="First name"
                    autoComplete="given-name"
                    className="input-underline"
                    aria-label="First name"
                  />
                  <FieldError message={state.fieldErrors?.first_name} />
                </div>
                <div>
                  <input
                    name="last_name"
                    placeholder="Last name"
                    autoComplete="family-name"
                    className="input-underline"
                    aria-label="Last name"
                  />
                  <FieldError message={state.fieldErrors?.last_name} />
                </div>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Work email"
                  autoComplete="email"
                  className="input-underline"
                  aria-label="Work email"
                />
                <FieldError message={state.fieldErrors?.email} />
              </div>
              <div>
                <input
                  name="organization"
                  placeholder="Organization name"
                  autoComplete="organization"
                  className="input-underline"
                  aria-label="Organization name"
                />
                <FieldError message={state.fieldErrors?.organization} />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us a bit more about what you're looking for"
                  rows={4}
                  className="input-underline resize-none"
                  aria-label="Message"
                />
                <FieldError message={state.fieldErrors?.message} />
              </div>

              {state.status === "error" && !state.fieldErrors && (
                <p className="text-[13px] font-semibold text-teal">
                  {state.message}
                </p>
              )}

              <button type="submit" disabled={isPending} className="pill pill--teal disabled:opacity-60">
                {isPending ? "Sending…" : "Send now"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
