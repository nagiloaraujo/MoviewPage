import React from "react";
import { act, render, screen } from "@testing-library/react";
import ChatSim from "@/components/ChatSim";

test("renderiza chat com status e mensagem inicial", () => {
  render(<ChatSim />);

  expect(screen.getByText("Chat em tempo real")).toBeInTheDocument();
  expect(screen.getByText("Online")).toBeInTheDocument();
  expect(screen.getByText(/Sou a IA da Moview/i)).toBeInTheDocument();
});

test("simula envio e resposta com indicador de digitando", async () => {
  jest.useFakeTimers();

  render(<ChatSim allowInTest maxTurns={1} />);

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText(/Quero automatizar o WhatsApp/i)).toBeInTheDocument();

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText("IA digitando")).toBeInTheDocument();

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText(/Comece com triagem/i)).toBeInTheDocument();

  jest.useRealTimers();
});
