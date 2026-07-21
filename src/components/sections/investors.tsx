import Image from "next/image";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";

type LogoTile = {
  name: string;
  src: string;
  /** Tailwind classes for the image container (width + height). */
  imgClass?: string;
  /**
   * Optical-alignment nudge: some source logos have their visual weight
   * (wordmark) biased toward the bottom of their canvas, which reads as
   * "sitting low" even though the image is mathematically centered. This
   * shifts the container a touch to compensate.
   */
  nudgeClass?: string;
};

const logoTiles: LogoTile[] = [
  { name: "Phillip Capital",            src: "/investors/phillip-capital.jpg",    imgClass: "h-20 w-full" },
  { name: "Paradise Group",             src: "/investors/paradise-group.jpg",     imgClass: "h-20 w-full" },
  { name: "Citystate Group",            src: "/investors/citystate-group.png",    imgClass: "h-14 w-full" },
  { name: "Rhodium Capital",            src: "/investors/rhodium-capital.jpeg",   imgClass: "h-16 w-16"   },
  { name: "Singapura Finance",          src: "/investors/singapura-finance.png",  imgClass: "h-16 w-full", nudgeClass: "-translate-y-1" },
  { name: "Sing Investments & Finance", src: "/investors/sing-investments.png",   imgClass: "h-16 w-full", nudgeClass: "-translate-y-1" },
  { name: "Azure Capital",              src: "/investors/azure-capital.jpeg",     imgClass: "h-16 w-16"   },
  { name: "Luminor Capital",            src: "/investors/luminor-capital.avif",   imgClass: "h-14 w-full" },
];

type TextTile = { label: string; icon: React.ReactNode };
const textTiles: TextTile[] = [
  {
    label: "High Net Worth Individuals",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 17c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    ),
  },
  {
    label: "Family Offices",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 21V10l9-7 9 7v11" />
        <rect x="9" y="14" width="6" height="7" />
      </svg>
    ),
  },
];

/** Existing Investors & Partners - light (mist) section. */
export function Investors() {
  return (
    <section data-nav-theme="light" className="bg-mist px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow="Existing investors & partners"
          tone="light"
          title={
            <>
              Backed by those who{" "}
              <span className="accent-word accent-word--sky">know us.</span>
            </>
          }
        />

        {/* Capital banner */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl bg-navy-deep px-7 py-5 md:mt-16 md:rounded-[1.5rem] md:px-10 md:py-6">
            <span className="text-xl font-bold text-teal md:text-2xl">~SGD 100M</span>
            <span className="text-sm text-white/75 md:text-base">
              cumulative notional hybrid / debt capital raised since{" "}
              <strong className="font-semibold text-white">2017</strong>.
            </span>
          </div>
        </Reveal>

        {/* 10-tile uniform grid: 2 cols → 5 cols */}
        <Reveal
          stagger
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:mt-12"
        >
          {/* Text tiles first */}
          {textTiles.map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-start justify-start gap-4 rounded-2xl bg-blue px-5 py-6"
            >
              <span className="text-teal/80">{t.icon}</span>
              <p className="text-[13px] font-semibold leading-snug text-white">
                {t.label}
              </p>
            </div>
          ))}

          {/* Logo tiles */}
          {logoTiles.map((tile) => (
            <div
              key={tile.name}
              className="flex items-center justify-center rounded-2xl bg-white px-5 py-5 shadow-[0_4px_20px_rgba(14,27,44,0.07)]"
              style={{ minHeight: "136px" }}
            >
              <div
                className={`relative ${tile.imgClass ?? "h-10 w-full"} ${tile.nudgeClass ?? ""}`}
              >
                <Image
                  src={tile.src}
                  alt={tile.name}
                  fill
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 14vw"
                  className="object-contain"
                  quality={85}
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
