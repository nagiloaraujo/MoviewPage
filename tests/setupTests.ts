import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  writable: true,
  value: function scrollTo(arg: number | ScrollToOptions) {
    const top = typeof arg === "number" ? arg : arg?.top ?? 0;
    (this as HTMLElement & { scrollTop: number }).scrollTop = top;
  },
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: class IntersectionObserverMock {
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
    }
    observe() {
      this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    unobserve() {}
    disconnect() {}
  },
});

Object.defineProperty(globalThis.HTMLMediaElement.prototype, "play", {
  writable: true,
  value: () => Promise.resolve(),
});

Object.defineProperty(globalThis.HTMLMediaElement.prototype, "pause", {
  writable: true,
  value: () => {},
});

const svgPathProto = (
  globalThis as unknown as {
    SVGPathElement?: {
      prototype: { getTotalLength?: () => number };
    };
  }
).SVGPathElement?.prototype;
if (svgPathProto && typeof svgPathProto.getTotalLength !== "function") {
  svgPathProto.getTotalLength = () => 1200;
}

jest.mock("gsap", () => {
  const ctx = (fn: () => void) => {
    fn();
    return { revert: jest.fn() };
  };

  const ticker = {
    add: jest.fn(),
    remove: jest.fn(),
    lagSmoothing: jest.fn(),
  };

  const gsap = {
    registerPlugin: jest.fn(),
    from: jest.fn(),
    to: jest.fn(),
    set: jest.fn(),
    timeline: jest.fn(() => ({ to: jest.fn().mockReturnThis() })),
    context: ctx,
    utils: { toArray: () => [] },
    ticker,
    killTweensOf: jest.fn(),
  };

  return { __esModule: true, default: gsap };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: jest.fn(() => ({ kill: jest.fn() })),
    update: jest.fn(),
    refresh: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

jest.mock("lenis", () => {
  return {
    __esModule: true,
    default: class Lenis {
      on() {}
      raf() {}
      destroy() {}
      scrollTo() {}
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});
