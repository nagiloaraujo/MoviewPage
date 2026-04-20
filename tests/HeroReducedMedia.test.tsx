import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "@/sections/Hero";

test("quando reduced-motion está ativo, não exibe controles de vídeo", () => {
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

  render(<Hero />);

  expect(screen.queryByText(/vídeo/i)).toBeNull();
});
