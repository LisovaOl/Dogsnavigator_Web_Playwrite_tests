import { test, expect } from "@playwright/test";

test.describe("Create Post tests", { tag: ["@functional", "@ui"] }, () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("/login");
    await page.getByRole("button", { name: "Я погоджуюсь" }).click();
    await page.getByRole("list").getByText("Увійти");
    await page.getByRole("textbox", { name: "Телефон" }).fill("950419402");
    await page.getByRole("textbox", { name: "Пароль" }).fill("11111111");
    await page.getByRole("button", { name: "Увійти" }).click();

    // close Instagram popup if visible
    await expect(page.locator(".close-icon")).toBeVisible();
    await page.locator(".close-icon").click();
  });
  test("DN-003 Create post", async ({ page }) => {
    const addPostButton = page.getByRole("button", {
      name: " Додати Пост ",
    });
    const publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });
    const closeButton = page.locator(".close-btn");

    await expect(addPostButton).toBeVisible();
    await addPostButton.click();

    await expect(page.getByText("Створення публікації")).toBeVisible();
    await expect(page.getByText("Що у вас нового?")).toBeVisible();
    await expect(page.getByRole("textbox")).toBeVisible();
    await expect(publishButton).toBeVisible();
    await expect(publishButton).toHaveCSS(
      "background-color",
      "rgb(173, 190, 216)"
    );
    await expect(publishButton).toHaveCSS("color", "rgb(255, 255, 255)");

    await closeButton.click();
    await expect(page.getByText("Створення публікації")).toBeHidden();
  });

  test.only("Add post with photo", async ({ page }) => {
    const addPostButton = page.getByRole("button", {
      name: " Додати Пост ",
    });
    const addPhotoButton = page.locator(".add-photo-btn");
    const publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });
    const filePath = "tests/assets/dog-photo.jpg";

    await addPostButton.click();

    await addPhotoButton.click();

    // Знаходимо реальний input, який використовує кнопка
    const fileInput = page.locator('input[type="file"]');

    // Встановлюємо файл без відкриття діалогу
    await fileInput.setInputFiles("fixtures/dog-photo-original.jpg");

    // Перевіряємо, що фото додано
    await expect(page.locator(".photo-preview")).toBeVisible();
    await expect(publishButton).toHaveCSS(
      "background-color",
      "rgb(255, 217, 118)"
    );

    // Add text to the post
    const postText = "This is a test post with photo.";
    await page.getByRole("textbox").fill(postText);
  });
});
