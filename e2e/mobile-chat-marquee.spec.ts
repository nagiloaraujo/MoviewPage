import { test, expect } from "@playwright/test";

test.setTimeout(45000);

const viewports = [
  { width: 320, height: 820, expectedChatHeight: "504px" },
  { width: 375, height: 820, expectedChatHeight: "540px" },
  { width: 414, height: 820, expectedChatHeight: "576px" },
] as const;

for (const vp of viewports) {
  test(`chat mobile: container fixo com movimento interno @ ${vp.width}px`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Painel Moview")).toBeVisible();
    await expect(page.locator(".moview-chat-viewport").first()).toBeVisible();

    const initial = await page.evaluate(() => {
      const doc = document.documentElement;
      const panel = document.querySelector(".moview-panel-chat") as HTMLElement | null;
      const viewport = document.querySelector(".moview-chat-viewport") as HTMLElement | null;
      if (!panel || !viewport) return null;

      const panelStyles = window.getComputedStyle(panel);
      const viewportStyles = window.getComputedStyle(viewport);

      return {
        docOverflow: doc.scrollWidth - doc.clientWidth,
        panelHeight: panelStyles.height,
        panelMinHeight: panelStyles.minHeight,
        panelMaxHeight: panelStyles.maxHeight,
        panelWidth: panel.getBoundingClientRect().width,
        viewportHeight: viewportStyles.height,
        viewportOverflowY: viewportStyles.overflowY,
        viewportScrollHeight: viewport.scrollHeight,
        viewportClientHeight: viewport.clientHeight,
        viewportScrollTop: viewport.scrollTop,
        messageCount: document.querySelectorAll(".moview-chat-viewport .moview-chat-bubble").length,
      };
    });

    expect(initial).not.toBeNull();
    expect(initial?.docOverflow).toBeLessThanOrEqual(1);
    expect(initial?.panelHeight).toBe(vp.expectedChatHeight);
    expect(initial?.panelMinHeight).toBe(vp.expectedChatHeight);
    expect(initial?.panelMaxHeight).toBe(vp.expectedChatHeight);
    expect(initial?.viewportOverflowY).toBe("auto");

    await page.waitForTimeout(6000);

    const later = await page.evaluate(() => {
      const panel = document.querySelector(".moview-panel-chat") as HTMLElement | null;
      const viewport = document.querySelector(".moview-chat-viewport") as HTMLElement | null;
      if (!panel || !viewport) return null;

      const panelStyles = window.getComputedStyle(panel);
      const viewportStyles = window.getComputedStyle(viewport);

      return {
        panelHeight: panelStyles.height,
        panelMinHeight: panelStyles.minHeight,
        panelMaxHeight: panelStyles.maxHeight,
        panelWidth: panel.getBoundingClientRect().width,
        viewportHeight: viewportStyles.height,
        viewportScrollHeight: viewport.scrollHeight,
        viewportClientHeight: viewport.clientHeight,
        viewportScrollTop: viewport.scrollTop,
        messageCount: document.querySelectorAll(".moview-chat-viewport .moview-chat-bubble").length,
      };
    });

    expect(later).not.toBeNull();
    expect(later?.panelHeight).toBe(vp.expectedChatHeight);
    expect(later?.panelMinHeight).toBe(vp.expectedChatHeight);
    expect(later?.panelMaxHeight).toBe(vp.expectedChatHeight);
    expect(later?.panelWidth).toBeCloseTo(initial?.panelWidth ?? 0, 1);
    expect(later?.messageCount ?? 0).toBeGreaterThanOrEqual(initial?.messageCount ?? 0);
    expect(later?.viewportScrollHeight ?? 0).toBeGreaterThanOrEqual(later?.viewportClientHeight ?? 0);
  });
}
