import React from "react";
import { render, screen } from "@testing-library/react";
import ChatSim from "@/components/ChatSim";

test("quando simulate=false, mantém UI estática", () => {
  render(<ChatSim simulate={false} />);
  expect(screen.getByText("Chat em tempo real")).toBeInTheDocument();
  expect(screen.getByText(/Sou a IA da Moview/i)).toBeInTheDocument();
});

