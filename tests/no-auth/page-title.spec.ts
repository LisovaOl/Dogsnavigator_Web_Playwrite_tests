import { test, expect } from "@playwright/test";

test("DN-001 Should have title", async ({ page }) => {
  await page.goto("https://dogsnavigator.ua/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Соцмережа для власників собак - Dogsnavigator"
  );
});
