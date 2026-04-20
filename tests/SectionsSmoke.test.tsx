import React from "react";
import { render, screen } from "@testing-library/react";
import NarrativeShift from "@/sections/NarrativeShift";
import Products from "@/sections/Products";
import HowItWorks from "@/sections/HowItWorks";
import Differential from "@/sections/Differential";
import Values from "@/sections/Values";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

test("renderiza seções principais sem quebrar o fluxo", () => {
  render(
    <div>
      <NarrativeShift />
      <Products />
      <HowItWorks />
      <Differential />
      <Values />
      <FinalCTA />
      <Footer />
    </div>,
  );

  expect(screen.getByText("NOSSAS SOLUÇÕES")).toBeInTheDocument();
  expect(screen.getByText("COMO FUNCIONA")).toBeInTheDocument();
  expect(screen.getByText("DIFERENCIAL")).toBeInTheDocument();
  expect(screen.getByText("CTA FINAL")).toBeInTheDocument();
  expect(screen.getByText(/Transformamos atendimento em receita/i)).toBeInTheDocument();
});
