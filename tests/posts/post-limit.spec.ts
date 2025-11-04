import { test, expect } from "@playwright/test";
import {
  applyCookies,
  closeInstagramPopup,
  logIn,
  logInDev,
} from "../login-functions";

test.describe(
  "Create Post tests. Ensure limit of 5 photo posts triggers notification",
  { tag: ["@functional", "@ui"] },
  () => {
    test.beforeEach(async ({ page }) => {
      // // PROD - Log In
      await page.goto("/login");
      await applyCookies(page);
      await logIn(page);
      // close Instagram popup if visible
      await closeInstagramPopup(page);

      // DEV - Log In
      // await logInDev(page);
    });
    test("DN-005 Verify notification when adding more than 5 posts with photos", async ({
      page,
    }) => {
      // Set variables for locators
      const addPostButton = page.getByRole("button", {
        name: " Додати Пост ",
      });
      const addPhotoButton = page.locator(".add-photo-btn");
      const publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });

      let i = 0;
      while (i < 5) {
        await addPostButton.click();
        await addPhotoButton.click();

        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles("fixtures/dog-photo-original.jpg");

        await publishButton.click();

        await page
          .getByText("Ваш пост успішно опубліковано!")
          .waitFor({ state: "visible" });
        await page.locator(".close-icon").click();

        i++;
      }

      // Add sixth post
      await addPostButton.click();
      await addPhotoButton.click();

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles("fixtures/dog-photo-original.jpg");

      await publishButton.click();

      // Message appeared
      await page
        .getByText(
          "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра."
        )
        .waitFor({ state: "visible" });

      // Close "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра." popup
      await expect(page.locator(".close-icon")).toBeVisible();
      await page.locator(".close-icon").click();
      await expect(page.getByText("Створення публікації")).toBeVisible();

      // Close add post popup
      await expect(page.locator(".close-btn")).toBeVisible();
      await page.locator(".close-btn").click();

      // Delete added posts - Clean up
      let el = 0;
      while (el < 5) {
        const profileDogLink = page.locator("#menu-bar").getByRole("link", {
          name: "Профіль Собаки",
        });
        await profileDogLink.click();
        await page.locator("//app-pet-page-publications-tab/ul/li[1]").click();
        await expect(page.locator("img.post-image")).toBeVisible();
        await page.getByRole("button").nth(3).click();

        await expect(
          page.getByText("Ви впевнені, що хочете видалити цей пост?")
        ).toBeVisible();
        await page.getByRole("button", { name: "ВИДАЛИТИ" }).click();
        await expect(
          page.getByText("Ви впевнені, що хочете видалити цей пост?")
        ).toBeHidden();

        el++;
      }
    });
  }
);
