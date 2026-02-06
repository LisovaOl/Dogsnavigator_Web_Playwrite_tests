import { test as base, expect, Page } from "@playwright/test";
import fs from "fs";
import path from "path";
import { LoginPage } from "../../src/pages/LoginPage";

type AuthFixtures = { page: Page };

const STORAGE_PATH = path.resolve("auth/dn-user.json");

export const test = base.extend<AuthFixtures>({
  page: async ({ browser }, use) => {
    // 1) Якщо є збережені дані, то використати їх
    const hasState = fs.existsSync(STORAGE_PATH);

    const context = await browser.newContext(
      hasState ? { storageState: STORAGE_PATH } : {},
    );

    const page = await context.newPage();

    // 2) Якщо нема, то залогінитись і зберегти
    if (!hasState) {
      const loginPage = new LoginPage(page);

      await loginPage.open();

      const acceptCookies = page
        .getByRole("button", { name: "Я погоджуюсь" })
        .first();
      if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click().catch(() => {});
      }

      await loginPage.login(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.LOGIN_PHONE!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.LOGIN_PASSWORD!,
      );

      // await expect(
      //   page.getByRole("button", { name: "Рекомендовані" }),
      // ).toBeVisible();

      // instagram popup
      await page
        .getByRole("checkbox", { name: "Більше не показувати" })
        .check();
      await page.locator(".close-icon > use").first().click();

      fs.mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });
      await context.storageState({ path: STORAGE_PATH });
    }
    await page.goto("/");
    await use(page);
    await context.close();
  },
});

export { expect };

// import { test as base, expect, Page } from "@playwright/test";
// import { LoginPage } from "../../src/pages/LoginPage";

// type AuthFixtures = {
//   page: Page;
// };

// export const test = base.extend<AuthFixtures>({
//   page: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);

//     // Open login page
//     await loginPage.open();

//     // Accept cookies
//     const acceptCookies = page
//       .getByRole("button", { name: "Я погоджуюсь" })
//       .first();
//     if (await acceptCookies.isVisible().catch(() => false)) {
//       await acceptCookies.click().catch(() => {});
//     }
//     // Login
//     await loginPage.login(
//       process.env.LOGIN_PHONE!,
//       process.env.LOGIN_PASSWORD!,
//     );
//     await expect(
//       page.getByRole("button", { name: "Рекомендовані" }),
//     ).toBeVisible();
//     // close Instagram popup
//     //await page.locator(".close-icon").click();
//     await page.getByRole("checkbox", { name: "Більше не показувати" }).check();
//     await page.locator(".close-icon > use").first().click();
//     // if (await close.isVisible().catch(() => false)) {
//     //   await close.click();
//     //  }
//     await use(page);

//   },
// });

// export { expect };
