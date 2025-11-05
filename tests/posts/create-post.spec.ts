import { test, expect } from "@playwright/test";
import { logInDev, logInPROD } from "../login-functions";
import {
  uploadPhotoFromFixture,
  deletePost,
  closeSuccessPostNotification,
  clickOnPublishButton,
  clickOnAddPhotoButton,
  clickOnAddPostButton,
} from "./posts-functions";

test.describe("Create Post tests", { tag: ["@functional", "@ui"] }, () => {
  test.beforeEach(async ({ page }) => {
    //
    // await logInPROD(page);
    //
    await logInDev(page);
    //
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

  test("DN-004 Add and Delete post with photo, ", async ({ page }) => {
    // Set variables for locators
    const addPostButton = page.getByRole("button", {
      name: " Додати Пост ",
    });
    const addPhotoButton = page.locator(".add-photo-btn");
    const publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });

    // Check Add Post button
    await expect(addPostButton).toHaveCSS(
      "background-color",
      "rgb(255, 217, 118)"
    );
    await expect(addPostButton).toHaveCSS("color", "rgb(21, 58, 114)");
    await clickOnAddPostButton(page);

    // Check Add Photo button
    await expect(addPhotoButton).toHaveCSS("color", "rgb(173, 190, 216)");
    await clickOnAddPhotoButton(page);

    await uploadPhotoFromFixture(page);

    // Check that the photo is added and "ОПУБЛІКУВАТИ" button change color
    await expect(page.locator(".photo-preview")).toBeVisible();
    await expect(publishButton).toHaveCSS(
      "background-color",
      "rgb(255, 217, 118)"
    );

    // Add text to the post
    const postText = "This is a test post with photo.";
    await page.getByRole("textbox").fill(postText);
    await expect(page.getByRole("textbox")).toHaveValue(postText);

    // Publish the post
    await clickOnPublishButton(page);

    // Verify post is published
    await closeSuccessPostNotification(page);

    // Delete the created post to clean up
    const profileDogLink = page.locator("#menu-bar").getByRole("link", {
      name: "Профіль Собаки",
    });
    await profileDogLink.click();
    await deletePost(page);
  });
});
