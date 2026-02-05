import { test, Page } from "@playwright/test";

export async function logInPROD(page: Page) {
  await page.goto("/login");
  // Apply Cookies
  await page.getByRole("button", { name: "Я погоджуюсь" }).click();

  await page.getByRole("list").getByText("Увійти");
  await page.getByRole("textbox", { name: "Телефон" }).fill("950419402");
  await page.getByRole("textbox", { name: "Пароль" }).fill("11111111");
  await page.getByRole("button", { name: "Увійти" }).click();

  // close Instagram popup if visible
  await page.locator(".close-icon").click();
}

export async function logInDev(page: Page) {
  await page.goto("https://admin:dev@dogsnavigator.terenbro.com/login");
  await page.getByRole("list").getByText("Увійти");
  await page.getByRole("textbox", { name: "Телефон" }).fill("632822952");
  await page.getByRole("textbox", { name: "Пароль" }).fill("11111111");
  await page.getByRole("button", { name: "Увійти" }).click();
  // Apply cookies
  await page.getByRole("button", { name: "Я погоджуюсь" }).click();

  // close Instagram popup if visible
  await page.locator(".close-icon").click();
}
