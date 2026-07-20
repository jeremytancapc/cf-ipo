import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Shift } from "@/components/sections/shift";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Moat } from "@/components/sections/moat";
import { Proof } from "@/components/sections/proof";
import { Prize } from "@/components/sections/prize";
import { Products } from "@/components/sections/products";
import { Group } from "@/components/sections/group";
import { Roadmap } from "@/components/sections/roadmap";
import { Investors } from "@/components/sections/investors";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Shift />
      <HowItWorks />
      <Moat />
      <Proof />
      <Investors />
      <Prize />
      <Products />
      <Group />
      <Roadmap />
      <Contact />
      <Footer />
    </main>
  );
}
