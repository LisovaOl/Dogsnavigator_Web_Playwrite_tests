import { test, expect } from "@playwright/test";

test.use({ storageState: "auth/dn-user.json" });

test("storageState keeps me logged in", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Рекомендовані" }),
  ).toBeVisible();
});
