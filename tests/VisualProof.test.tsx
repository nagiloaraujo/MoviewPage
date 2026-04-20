import React from "react";
import { render, screen } from "@testing-library/react";
import VisualProof from "@/sections/VisualProof";

test("em reduced motion renderiza todas as mensagens", () => {
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

  render(<VisualProof />);

  expect(screen.getByText("Oi! Vocês têm atendimento 24h?")).toBeInTheDocument();
  expect(
    screen.getByText("Quer começar com WhatsApp + site e expandir depois?"),
  ).toBeInTheDocument();
});
