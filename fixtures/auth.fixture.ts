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
    const acceptCookies = page.getByRole("button", { name: "Я погоджуюсь" });
    if (await acceptCookies.isVisible({ timeout: 3000 })) {
      await acceptCookies.click();
    }

    // Login
    await loginPage.login(
      process.env.LOGIN_PHONE!,
      process.env.LOGIN_PASSWORD!
    );

    // close Instagram popup
    await page.locator(".close-icon").click();

    await use(page);
  },
});

export { expect };
