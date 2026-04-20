import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import NarrativeShift from "@/sections/NarrativeShift";
import Products from "@/sections/Products";
import HowItWorks from "@/sections/HowItWorks";
import Differential from "@/sections/Differential";
import RotatingSlogans from "@/sections/RotatingSlogans";
import Values from "@/sections/Values";
import FinalCTA from "@/sections/FinalCTA";

test("prefers-reduced-motion mantém a página funcional sem animações", () => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

  render(
    <div>
      <Header />
      <Hero />
      <NarrativeShift />
      <Products />
      <HowItWorks />
      <Differential />
      <RotatingSlogans />
      <Values />
      <FinalCTA />
    </div>,
  );

  expect(screen.getByText("Início")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "IA que movimenta resultados" })).toBeInTheDocument();
  expect(screen.getByText("NOSSAS SOLUÇÕES")).toBeInTheDocument();
  expect(screen.getByText("COMO FUNCIONA")).toBeInTheDocument();
  expect(screen.getByText("CTA FINAL")).toBeInTheDocument();
});

