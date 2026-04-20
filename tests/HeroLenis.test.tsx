import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const scrollTo = jest.fn();

jest.mock("../src/components/SmoothScroll", () => ({
  __esModule: true,
  useLenis: () => ({ scrollTo }),
  default: ({ children }: { children: React.ReactNode }) => children,
}));

import Hero from "@/sections/Hero";

test("Hero usa Lenis para scroll nos CTAs", () => {
  const contato = document.createElement("div");
  contato.id = "contato";
  document.body.appendChild(contato);

  const como = document.createElement("div");
  como.id = "como-funciona";
  document.body.appendChild(como);

  render(<Hero />);

  fireEvent.click(screen.getByText("Quero automatizar meu atendimento"));
  fireEvent.click(screen.getByText("Ver como funciona"));

  expect(scrollTo).toHaveBeenCalled();

  document.body.removeChild(contato);
  document.body.removeChild(como);
});

