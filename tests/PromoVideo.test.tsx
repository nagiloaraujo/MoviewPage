import React from "react";
import { act, render, screen } from "@testing-library/react";
import PromoVideo from "@/sections/PromoVideo";

test("renders promo section with scroll hint initially", () => {
  jest.useFakeTimers();
  render(<PromoVideo />);
  expect(screen.getByText("SCROLL TO CONTINUE")).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(3100);
  });

  expect(screen.queryByText("SCROLL TO CONTINUE")).toBeNull();
  jest.useRealTimers();
});

