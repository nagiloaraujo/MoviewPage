import { test, expect, type Page } from "@playwright/test";

const viewports = [
  { width: 320, height: 820 },
  { width: 375, height: 820 },
  { width: 414, height: 820 },
] as const;

for (const vp of viewports) {
  test(`hero/painel: sem overflow horizontal @ ${vp.width}px`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByText("Painel Moview")).toBeVisible();

    const header = page.locator(".moview-panel .moview-panel-header").first();
    await expect(header).toBeVisible();

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const docOverflow = doc.scrollWidth - doc.clientWidth;

      const chat = document.querySelector(".moview-panel-chat") as HTMLElement | null;
      const chatOverflow = chat ? chat.scrollWidth - chat.clientWidth : null;

      const bubbleOffenders = Array.from(
        document.querySelectorAll(".moview-panel .moview-chat-bubble"),
      )
        .map((el) => {
          const e = el as HTMLElement;
          return {
            scrollWidth: e.scrollWidth,
            clientWidth: e.clientWidth,
            text: (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 90),
          };
        })
        .filter((o) => o.scrollWidth > o.clientWidth + 1)
        .slice(0, 8);

      return { docOverflow, chatOverflow, bubbleOffenders };
    });

    expect(overflow.docOverflow).toBeLessThanOrEqual(1);
    expect(overflow.chatOverflow ?? 0).toBeLessThanOrEqual(1);
    expect(overflow.bubbleOffenders).toEqual([]);
  });
}
