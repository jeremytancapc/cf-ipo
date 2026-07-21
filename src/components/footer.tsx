import Image from "next/image";
import { Starfield } from "./starfield";

const disclaimer = `The information contained herein is provided "as is". Capital C Corporation Pte Ltd makes no warranty, expressed or implied, as to the results obtained from the use of this information and disclaims all implied warranties. This site has not been reviewed by the MAS and should not be used in place of an actual prospectus. Nothing herein constitutes financial, tax, legal, insurance or investment advice, nor an offer or solicitation to deal in any security, fund, product or service. The information is not directed at or intended for distribution to any person (or entity) who is not an "Accredited Investor" as defined in the Securities and Futures Act (Chapter 289) of Singapore.`;

const sections = [
  { href: "/#shift", label: "The Shift" },
  { href: "/#proof", label: "Traction" },
  { href: "/#group", label: "The Group" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/financials", label: "Deep Dive" },
];

const contacts = [
  { href: "mailto:ipo@capc.com.sg", label: "Email" },
  { href: "tel:+6591919191", label: "Call" },
  { href: "https://wa.me/6591919191", label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      data-nav-theme="dark"
      className="dark-section relative overflow-hidden bg-navy-deep px-5 pb-10 pt-24 md:px-10 md:pt-32"
    >
      <Starfield density={0.4} />
      <div className="relative">
        <div className="flex flex-col justify-between gap-14 md:flex-row">
          <div>
            <div className="relative h-10 w-52 md:h-14 md:w-72">
              <Image
                src="/cf-money-logo-white.png"
                alt="CF Money"
                fill
                sizes="(max-width: 768px) 208px, 288px"
                className="object-contain object-left"
                priority
              />
            </div>
            <p className="eyebrow mt-5 text-[10px] text-white/55">
              A Capital C Corporation company · Singapore
            </p>
            <p className="eyebrow mt-2 text-[10px] text-white/55">
              Private &amp; confidential · Pre-IPO · Targeting 2027 SGX Catalist
            </p>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div>
              <p className="eyebrow text-[10px] text-teal">Sections</p>
              <ul className="mt-6 space-y-3.5">
                {sections.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="footer-link text-white/85">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-[10px] text-teal">Contact</p>
              <ul className="mt-6 space-y-3.5">
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className="footer-link text-white/85"
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-(--color-line-dark) pt-8">
          <p className="max-w-[110ch] text-[11px] leading-[1.85] text-white/45">
            {disclaimer}
          </p>
          <p className="eyebrow mt-8 text-[9px] text-white/40">
            © {new Date().getFullYear()} Capital C Corporation Pte Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
