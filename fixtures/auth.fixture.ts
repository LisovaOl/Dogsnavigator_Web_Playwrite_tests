import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type AuthFixtures = {
  page: Page;
};

export const test = base.extend<AuthFixtures>({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.open();

    // Accept cookies
    const acceptCookies = page
      .getByRole("button", { name: "Я погоджуюсь" })
      .first();
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click().catch(() => {});
    }
    // Login
    await loginPage.login(
      process.env.LOGIN_PHONE!,
      process.env.LOGIN_PASSWORD!,
    );
    await expect(
      page.getByRole("button", { name: "Рекомендовані" }),
    ).toBeVisible();
    // close Instagram popup
    //await page.locator(".close-icon").click();
    await page.getByRole("checkbox", { name: "Більше не показувати" }).check();
    await page.locator(".close-icon > use").first().click();
    // if (await close.isVisible().catch(() => false)) {
    //   await close.click();
    //  }
    await use(page);
  },
});

export { expect };
