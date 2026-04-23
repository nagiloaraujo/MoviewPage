import Hero from "@/sections/Hero";
import NarrativeShift from "@/sections/NarrativeShift";
import Products from "@/sections/Products";
import HowItWorks from "@/sections/HowItWorks";
import Differential from "@/sections/Differential";
import TrustedBrands from "@/sections/TrustedBrands";
import VisualProof from "@/sections/VisualProof";
import RotatingSlogans from "@/sections/RotatingSlogans";
import Values from "@/sections/Values";
import PromoVideo from "@/sections/PromoVideo";
import FinalCTA from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative z-20 flex-1">
      <Hero />
      <NarrativeShift />
      <Products />
      <HowItWorks />
      <Differential />
      <TrustedBrands />
      <VisualProof />
      <RotatingSlogans />
      <Values />
      <PromoVideo />
      <FinalCTA />
    </main>
  );
}
