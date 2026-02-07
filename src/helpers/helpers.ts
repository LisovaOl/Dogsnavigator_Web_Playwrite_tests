import { Page, expect } from "@playwright/test";

export async function makeNewString(string: string) {
  const base = string.trim();
  const suffix = Date.now().toString().slice(-5); // коротко
  // якщо є ліміт довжини — обрізай
  return `${base}-${suffix}`.slice(0, 9);
}

export async function goToMyDogProfileFromSidebar(page: Page) {
  await page.getByRole("link", { name: "Профіль Собаки" }).click();
  await expect(page.getByRole("heading", { name: "Мій собака" })).toBeVisible();
}

export async function goToProfile(page: Page) {
  await page.getByRole("link", { name: "Мій Профіль", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Мій Профіль" }),
  ).toBeVisible();
}
