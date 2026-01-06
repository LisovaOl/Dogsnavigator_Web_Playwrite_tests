import { test, expect } from "@playwright/test";

test.skip(
  "Should be visible Instagram and Cookies popups",
  { tag: ["@smoke", "@no-auth"] },
  async ({ page }) => {
    await page.goto("https://dogsnavigator.ua/");
    await expect(
      page.locator("div").filter({ hasText: "Хочеш бути в курсі новин" }).nth(2)
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Перейти У Інстаграм" })
    ).toBeVisible();
    await expect(page.locator("app-instagram-cta")).toContainText(
      "Хочеш бути в курсі новин Dogsnavigator?"
    );
    await expect(page.getByText("Більше не показувати")).toBeVisible();
    await expect(page.locator(".close-icon")).toBeVisible();
    await page.locator(".close-icon").click();
    await expect(
      page.locator("div").filter({ hasText: "Хочеш бути в курсі новин" }).nth(2)
    ).toBeHidden();

    await expect(
      page.locator("section").filter({
        hasText: "Продовжуючи, я підтверджую, що повністю згоден ",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Я погоджуюсь" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Я погоджуюсь" }).click();
    await expect(
      page.locator("section").filter({
        hasText: "Продовжуючи, я підтверджую, що повністю згоден ",
      })
    ).toBeHidden();

    await expect(
      page.getByText(
        "Доступ до сторінки з публікаціями є лише у зареєстрованих користувачів"
      )
    ).toBeVisible();

    await page.getByRole("link", { name: "зареєструйтесь" }).click();
    await expect(page.getByRole("list").getByText("Увійти")).toBeVisible();
  }
);
