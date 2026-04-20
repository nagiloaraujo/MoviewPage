import React from "react";
import { act, render, screen } from "@testing-library/react";
import Header from "@/components/Header";

test("Header aplica estilo de scrolled ao rolar", () => {
  Object.defineProperty(window, "scrollY", { value: 120, writable: true });
  const { container } = render(<Header />);
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });

  expect(screen.getByRole("button", { name: "Falar com especialista" })).toBeInTheDocument();

  const bar = container.querySelector(".mt-3");
  expect(bar?.className).toMatch(/\bh-14\b/);
});
