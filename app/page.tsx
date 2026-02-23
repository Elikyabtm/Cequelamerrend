import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Preface } from "@/components/preface";
import { Characters } from "@/components/characters";
import { Herbarium } from "@/components/herbarium";
import { ChapterPreview } from "@/components/chapter-preview";
import { BalanceSlider } from "@/components/balance-slider";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

export default function Page() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Preface />
      <SectionDivider />
      <Characters />
      <SectionDivider />
      <Herbarium />
      <SectionDivider />
      <ChapterPreview />
      <SectionDivider />
      <BalanceSlider />
      <SectionDivider />
      <Newsletter />
      <Footer />
    </main>
  );
}
