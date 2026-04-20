import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Hero from "@/sections/Hero";

test("renderiza headline e CTAs do hero", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1, name: "IA que movimenta resultados" })).toBeInTheDocument();
  expect(screen.getByText("Quero automatizar meu atendimento")).toBeInTheDocument();
  expect(screen.getByText("Ver como funciona")).toBeInTheDocument();
});

test("remove o vídeo se ocorrer erro de carregamento", () => {
  const { container } = render(<Hero />);
  const video = container.querySelector("video");
  expect(video).toBeTruthy();
  if (!video) return;

  fireEvent.error(video);
  expect(container.querySelector("video")).toBeNull();
});
