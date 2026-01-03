import { test, expect } from "@playwright/test";
import { logInPROD, logInDev } from "../login-functions";
import {
  uploadPhotoFromFixture,
  deletePost,
  closeSuccessPostNotification,
  clickOnAddPhotoButton,
  clickOnPublishButton,
  clickOnAddPostButton,
} from "./posts-functions";

test.describe(
  "Create Post tests. Ensure limit of 5 photo posts triggers notification",
  { tag: ["@functional", "@ui"] },
  () => {
    test.beforeEach(async ({ page }) => {
      //
      await logInPROD(page);
      //
      //await logInDev(page);
      //
    });
    test("DN-005 Verify notification when adding more than 5 posts with photos", async ({
      page,
    }) => {
      // Set variables for locators

      let i = 0;
      while (i < 5) {
        await clickOnAddPostButton(page);
        await clickOnAddPhotoButton(page);
        await uploadPhotoFromFixture(page);
        await clickOnPublishButton(page);
        await closeSuccessPostNotification(page);
        i++;
      }

      // Add sixth post
      await clickOnAddPostButton(page);
      await clickOnAddPhotoButton(page);
      await uploadPhotoFromFixture(page);
      await clickOnPublishButton(page);

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
        await deletePost(page);

        el++;
      }
    });
  }
);
