import { Page, expect } from "@playwright/test";

export async function goToMyProfile(page: Page) {
  await page.getByRole("link", { name: "Профіль Собаки" }).click();
  await expect(page.getByRole("heading", { name: "Мій собака" })).toBeVisible();
}
