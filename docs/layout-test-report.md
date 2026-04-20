# Layout Test Report

Date: 2026-04-20  
App: Moview landing page (Next.js)  
URL tested: http://localhost:3000/  
Environment: Windows, local dev build, smooth scrolling enabled (Lenis)

## Scope

- Section ordering and vertical flow (Hero → Footer)
- Alignment and sizing issues (flex/grid, overflow, spacing)
- Layering issues (z-index, sticky/pin interactions)
- Runtime errors affecting DOM/layout (console + unhandled errors)

## Results Summary

- Console errors: none observed during manual scroll-through.
- Major layout issue found and fixed: PromoVideo could render as a black/blank fullscreen block instead of the intended video, which made the page look “out of order” (CTA/Footer appearing to disappear while in that region).

## Findings & Fixes

### 1) PromoVideo: fullscreen area appears blank/black

**Symptoms**

- While scrolling into the promo section, the viewport could become almost entirely black for a large scroll range.
- This visually looked like broken section ordering (next sections “missing”) even though they existed further down the page.

**Root cause**

- PromoVideo relied on ScrollTrigger-driven opacity control for a cover overlay. In practice (with Lenis smooth scroll + timing/refresh variability), the overlay could remain opaque and hide the media layer.

**Fix implemented**

- Removed the GSAP/ScrollTrigger dependency from PromoVideo’s fade logic.
- Replaced it with a rAF-driven, DOM-based scroll progress calculation that adjusts the media layer opacity using `getBoundingClientRect()` (works regardless of smooth scroll internals).

**Code reference**

- [PromoVideo.tsx](file:///c:/Users/nagil/OneDrive/%C3%81rea%20de%20Trabalho/EquipeHerz/Nova%20pasta/MoviewPage/src/sections/PromoVideo.tsx)

**Screenshots (before/after)**

- Before (black/blank in promo region):  
  `c:\Users\nagil\AppData\Local\Temp\trae\screenshots\docs\layout-report\before-10-near-bottom.png`
- After (promo video visible):  
  `c:\Users\nagil\AppData\Local\Temp\trae\screenshots\docs\layout-report\after-01-promo-mid.png`
- After (transition into promo without blank block):  
  `c:\Users\nagil\AppData\Local\Temp\trae\screenshots\docs\layout-report\after-02-values-to-promo.png`

### 2) Values: horizontal presentation stability

**Status**

- No current alignment/order breakage observed in this run.
- Values uses a simple horizontal overflow scroller, avoiding pin-based horizontal scroll behavior that can destabilize layout flow.

**Code reference**

- [Values.tsx](file:///c:/Users/nagil/OneDrive/%C3%81rea%20de%20Trabalho/EquipeHerz/Nova%20pasta/MoviewPage/src/sections/Values.tsx)

## Section-by-Section Check (Desktop viewport)

- Hero: aligned; chat panel remains contained; no overflow bleeding.
- NarrativeShift: aligned; no stacking/overlap issues observed.
- Products: cards align in grid; no unexpected wrapping/collisions.
- HowItWorks: step cards align; no clipped content observed.
- Differential / VisualProof / RotatingSlogans: no ordering or overlap issues observed.
- Values: scroller behaves; content remains in normal flow.
- PromoVideo: fixed (see Finding #1).
- FinalCTA + Footer: visible after promo; links and spacing align.

## Responsive & Cross-Browser Coverage

Manual testing in the built-in browser tab is limited to the current viewport size. To systematize breakpoint and browser checks, Playwright E2E tests were added.

- Config: [playwright.config.ts](file:///c:/Users/nagil/OneDrive/%C3%81rea%20de%20Trabalho/EquipeHerz/Nova%20pasta/MoviewPage/playwright.config.ts)
- Test: [layout.spec.ts](file:///c:/Users/nagil/OneDrive/%C3%81rea%20de%20Trabalho/EquipeHerz/Nova%20pasta/MoviewPage/e2e/layout.spec.ts)

Runs:

- `npm run test:e2e` (projects: Chromium/Firefox/WebKit desktop + Chromium tablet/mobile)
- `npm run test:e2e:report` (opens Playwright HTML report)

Note:

- First-time Playwright usage requires browser binaries: `npx playwright install`
