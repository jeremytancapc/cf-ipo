import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { InvestorGate } from "@/components/investor-gate";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CF Money - The AI-Native Lender | Capital C Corporation",
  description:
    "We lend by intelligence, not guesswork. CF Money, a Capital C Corporation company, is targeting a 2027 SGX Catalist listing.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2d5384",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} antialiased`}>
      <body>
        <InvestorGate />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
