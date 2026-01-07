import { test, expect } from "../../fixtures/auth.fixture";

test("test", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Подобається" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Подобається" })).toHaveCSS(
    "color",
    "rgb(21, 58, 114)"
  );

  await page.getByRole("button", { name: "Подобається" }).first().click();
  await expect(page.getByRole("button", { name: "Подобається" })).toHaveCSS(
    "color",
    "rgb(255, 83, 100)"
  );

  await page.getByRole("button", { name: "Подобається (1)" }).first().click();
  await page.getByRole("button", { name: "Подобається" }).first().click();
  await page.getByRole("button", { name: "Подобається (1)" }).first().click();
});
