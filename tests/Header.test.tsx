import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "@/components/Header";

test("renderiza navegação e CTA", () => {
  render(<Header />);

  expect(screen.getByText("Início")).toBeInTheDocument();
  expect(screen.getByText("Soluções")).toBeInTheDocument();
  expect(screen.getByText("Como funciona")).toBeInTheDocument();
  expect(screen.getByText("Contato")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Falar com especialista" })).toBeInTheDocument();
});

test("clique no CTA não quebra quando destino existe", () => {
  const el = document.createElement("div");
  el.id = "contato";
  el.scrollIntoView = jest.fn();
  document.body.appendChild(el);

  render(<Header />);
  fireEvent.click(screen.getByRole("button", { name: "Falar com especialista" }));

  expect(el.scrollIntoView).toHaveBeenCalled();

  document.body.removeChild(el);
});

