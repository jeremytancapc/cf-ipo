"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const anchors = [
  { href: "/#shift", label: "The Shift" },
  { href: "/#proof", label: "Traction" },
  { href: "/#group", label: "The Group" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#contact", label: "Contact" },
];

/** Vertical position (px from viewport top) the theme/fade observers sample against. */
const SAMPLE_LINE = 72;

/** Floating nav: bare logo mark top-left (swaps blue/white for contrast, fades near the footer), centered pill of links. */
export function Nav() {
  const pathname = usePathname();
  const onFinancials = pathname === "/financials";
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    const sampleMargin = `-${SAMPLE_LINE}px 0px -${Math.max(
      window.innerHeight - SAMPLE_LINE - 1,
      0
    )}px 0px`;

    const themeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const value = entry.target.getAttribute("data-nav-theme");
          if (value === "light" || value === "dark") setTheme(value);
        }
      },
      { rootMargin: sampleMargin, threshold: 0 }
    );
    sections.forEach((el) => themeObserver.observe(el));

    const footer = document.getElementById("footer");
    const fadeObserver = footer
      ? new IntersectionObserver(
          ([entry]) => setNearFooter(entry.isIntersecting),
          { rootMargin: `-${SAMPLE_LINE}px 0px 0px 0px`, threshold: 0 }
        )
      : null;
    if (footer && fadeObserver) fadeObserver.observe(footer);

    return () => {
      themeObserver.disconnect();
      fadeObserver?.disconnect();
    };
  }, []);

  const logoSrc = theme === "light" ? "/capc-logo-blue.png" : "/capc-logo-white.png";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between px-5 pt-4 md:px-8">
        <Link
          href="/"
          aria-label="Capital C Corporation"
          className={`pointer-events-auto block transition-opacity duration-500 ${
            nearFooter ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <Image
              key={logoSrc}
              src={logoSrc}
              alt="Capital C Corporation"
              fill
              sizes="80px"
              className="object-contain drop-shadow-[0_4px_16px_rgba(10,22,38,0.3)]"
              priority
            />
          </div>
        </Link>
      </div>

      <nav className="pointer-events-auto absolute left-1/2 top-4 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_12px_40px_rgba(10,22,38,0.22)] md:flex">
        {!onFinancials &&
          anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-mist"
            >
              {a.label}
            </a>
          ))}
        {onFinancials && (
          <Link
            href="/"
            className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-mist"
          >
            ← Back to story
          </Link>
        )}
        <Link
          href={onFinancials ? "/#contact" : "/financials"}
          className="rounded-full bg-teal px-5 py-2.5 text-[13px] font-bold text-navy-deep transition-colors hover:bg-teal-bright"
        >
          {onFinancials ? "Contact us" : "The numbers"}
        </Link>
      </nav>

      {/* Mobile: compact pill on the right */}
      <div className="absolute right-5 top-4 md:hidden">
        <Link
          href={onFinancials ? "/" : "/financials"}
          className="pointer-events-auto inline-flex rounded-full bg-teal px-4 py-2.5 text-[12px] font-bold text-navy-deep shadow-[0_10px_30px_rgba(10,22,38,0.25)]"
        >
          {onFinancials ? "← Story" : "The numbers"}
        </Link>
      </div>
    </header>
  );
}
