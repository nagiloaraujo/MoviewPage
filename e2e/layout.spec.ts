import { test, expect } from "@playwright/test";

test("layout: sections render in order without console errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: /IA que movimenta resultados/i })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("01-hero.png") });

  await page.getByRole("heading", { name: /Produtos que se encaixam/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: testInfo.outputPath("02-products.png") });

  await page.getByRole("heading", { name: /Um fluxo contínuo/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: testInfo.outputPath("03-how-it-works.png") });

  await page.getByRole("heading", { name: /Missão, visão e valores/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: testInfo.outputPath("04-values.png") });

  await page.getByRole("heading", { name: /Promo video/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await page.screenshot({ path: testInfo.outputPath("05-promo.png") });

  await page.getByRole("heading", { name: /Pronto para transformar/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: testInfo.outputPath("06-final-cta.png") });

  await page.getByRole("link", { name: /Política de privacidade/i }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.screenshot({ path: testInfo.outputPath("07-footer.png") });

  expect(errors).toEqual([]);
});

