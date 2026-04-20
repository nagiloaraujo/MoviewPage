import React from "react";
import { render, screen } from "@testing-library/react";
import gsap from "gsap";
import MoviewLogo from "@/components/MoviewLogo";
import SmoothScroll from "@/components/SmoothScroll";

test("renderiza logo com texto", () => {
  render(<MoviewLogo withText />);
  expect(screen.getByText("MOVIEW")).toBeInTheDocument();
  expect(screen.getByText("AUTOMAÇÃO")).toBeInTheDocument();
});

test("renderiza logo sem texto quando solicitado", () => {
  render(<MoviewLogo withText={false} />);
  expect(screen.queryByText("AUTOMAÇÃO")).toBeNull();
});

test("SmoothScroll inicializa ticker e desmonta sem erros", () => {
  const { unmount } = render(
    <SmoothScroll>
      <div>ok</div>
    </SmoothScroll>,
  );

  expect((gsap as unknown as { ticker: { add: jest.Mock } }).ticker.add).toHaveBeenCalled();

  unmount();

  expect((gsap as unknown as { ticker: { remove: jest.Mock } }).ticker.remove).toHaveBeenCalled();
});

test("SmoothScroll respeita prefers-reduced-motion", () => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

  render(
    <SmoothScroll>
      <div>ok</div>
    </SmoothScroll>,
  );

  expect((gsap as unknown as { ticker: { add: jest.Mock } }).ticker.add).not.toHaveBeenCalled();
});
