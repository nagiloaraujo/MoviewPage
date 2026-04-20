import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const scrollTo = jest.fn();

jest.mock("../src/components/SmoothScroll", () => ({
  __esModule: true,
  useLenis: () => ({ scrollTo }),
  default: ({ children }: { children: React.ReactNode }) => children,
}));

import Header from "@/components/Header";

test("quando Lenis existe, usa scrollTo para navegação", () => {
  const el = document.createElement("div");
  el.id = "contato";
  document.body.appendChild(el);

  render(<Header />);
  fireEvent.click(screen.getByRole("button", { name: "Falar com especialista" }));

  expect(scrollTo).toHaveBeenCalled();

  document.body.removeChild(el);
});

