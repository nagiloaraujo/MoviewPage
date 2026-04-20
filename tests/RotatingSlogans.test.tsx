import React from "react";
import { act, render, screen } from "@testing-library/react";
import RotatingSlogans from "@/sections/RotatingSlogans";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("troca slogans automaticamente", () => {
  render(<RotatingSlogans />);

  expect(screen.getByText("Tecnologia que atende e vende")).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(2600);
  });
  act(() => {
    jest.advanceTimersByTime(260);
  });

  expect(screen.getByText("Automação que vende. Comunicação que escala")).toBeInTheDocument();
});
