import { expect, test } from "@playwright/test";

test.setTimeout(45000);

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

for (const viewport of viewports) {
  test(`seção setorial e CTAs de WhatsApp @ ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const result = await page.evaluate(() => {
      const whatsappHref = "https://wa.me/5554999699949?text=Ol%C3%A1!%20estou%20querendo%20saber%20mais%20sobre%20a%20Moview%2C%20fiquei%20interessado(a)!";
      const marqueeCards = document.querySelectorAll(".moview-brand-marquee .moview-brand-track > div").length;
      const marqueeImages = document.querySelectorAll(".moview-brand-marquee img").length;
      const bodyText = document.body.innerText || "";

      const heroLink = Array.from(document.querySelectorAll("a")).find((el) =>
        (el.textContent || "").includes("Quero levar IA para minha operação"),
      ) as HTMLAnchorElement | undefined;
      const finalLink = Array.from(document.querySelectorAll("a")).find((el) =>
        (el.textContent || "").includes("Quero falar com a Moview"),
      ) as HTMLAnchorElement | undefined;
      const specialistLinks = Array.from(document.querySelectorAll("a"))
        .filter((el) => (el.textContent || "").includes("Falar com especialista"))
        .map((el) => (el as HTMLAnchorElement).href);

      return {
        marqueeCards,
        marqueeImages,
        hasOldClientClaim: bodyText.includes("MARCAS QUE CONFIAM"),
        hasSectorHeading: bodyText.includes("MERCADO ESPECIALIZADO"),
        hasSectorCopy: bodyText.includes("mercado de revestimentos"),
        heroHref: heroLink?.href ?? "",
        finalHref: finalLink?.href ?? "",
        specialistLinks,
        expectedHref: whatsappHref,
      };
    });

    expect(result.marqueeCards).toBeGreaterThan(0);
    expect(result.marqueeImages).toBe(0);
    expect(result.hasOldClientClaim).toBe(false);
    expect(result.hasSectorHeading).toBe(true);
    expect(result.hasSectorCopy).toBe(true);
    expect(result.heroHref).toBe(result.expectedHref);
    expect(result.finalHref).toBe(result.expectedHref);
    expect(result.specialistLinks).toHaveLength(2);
    expect(result.specialistLinks.every((href) => href === result.expectedHref)).toBe(true);
  });
}
