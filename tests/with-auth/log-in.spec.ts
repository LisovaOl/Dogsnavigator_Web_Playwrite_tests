import { test, expect } from "@playwright/test";

test("DN-001 Should have title", async ({ page }) => {
  await page.goto("/login");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Вхід та реєстрація - Dogsnavigator");
  await page.screenshot({ path: "with-auth-log-in.png" });
  await page.getByRole("button", { name: "Я погоджуюсь" }).click();
  await page.getByRole("list").getByText("Увійти");
  await page.getByRole("textbox", { name: "Телефон" }).fill("950419402");
  await page.getByRole("textbox", { name: "Пароль" }).fill("11111111");
  await page.getByRole("button", { name: "Увійти" }).click();

  // close Instagram popup if visible
  await expect(page.locator(".close-icon")).toBeVisible();
  await page.locator(".close-icon").click();

  await expect(page).toHaveURL("");
  await expect(page.locator("h1")).toHaveText("Пости");
  //await page.screenshot({ path: "with-auth-posts-page.png" });
  await expect(
    page.getByRole("button", { name: "Рекомендовані" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Обрані Собаки" })
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Мої пости" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: " Додати Пост " })
  ).toBeVisible();
});
