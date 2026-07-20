import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  /** Section background: drives text + accent colors. */
  tone?: "blue" | "space" | "light";
  className?: string;
};

/** Tracked-caps tag + oversized light display title used to open every section. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  tone = "blue",
  className = "",
}: SectionHeadingProps) {
  const tagColor = tone === "light" ? "text-blue" : "text-teal";
  const titleColor = tone === "light" ? "text-ink" : "text-white";

  return (
    <Reveal className={className}>
      <div className={`eyebrow flex items-center gap-3 ${tagColor}`}>
        <span className="rounded-full border border-current px-3 py-1.5 text-[9.5px]">
          {index}
        </span>
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`display mt-7 max-w-[15ch] text-[length:var(--text-h2)] ${titleColor}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
