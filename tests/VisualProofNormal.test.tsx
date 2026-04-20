import React from "react";
import { act, render, screen } from "@testing-library/react";
import VisualProof from "@/sections/VisualProof";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("em modo normal, mensagens aparecem progressivamente", () => {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

  render(<VisualProof />);

  expect(screen.queryByText("Quer começar com WhatsApp + site e expandir depois?")).toBeNull();

  act(() => {
    jest.advanceTimersByTime(5200);
  });

  expect(screen.getByText(/Quer começar com WhatsApp \+ site/i)).toBeInTheDocument();
});
