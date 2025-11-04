import { test, expect } from "@playwright/test";

test("DN-01 Should have title", async ({ page }) => {
  await page.goto("https://dogsnavigator.ua/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Соцмережа для власників собак - Dogsnavigator"
  );
});

test.describe("Dogsnavigator - Posts", () => {
  test(
    "DN-02 | Verify post creation flow",
    { tag: ["@smoke", "@ui"] },
    async ({ page }) => {
      const addPostButton = page.getByRole("button", {
        name: " Додати Пост ",
      });
      // Arrange
      await page.goto("https://dogsnavigator.ua/");

      // Act
      await addPostButton.click();

      // Assert
      await expect(page.getByText("Створення публікації")).toBeVisible();
    }
  );
});
