import { test, expect } from "@playwright/test";
import { applyCookies, closeInstagramPopup, logIn } from "../login-functions";

test.describe("Create Post tests", { tag: ["@functional", "@ui"] }, () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("/login");

    await applyCookies(page);

    await logIn(page);

    // close Instagram popup if visible
    await closeInstagramPopup(page);
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
    await addPostButton.click();

    // Check Add Photo button
    await expect(addPhotoButton).toHaveCSS("color", "rgb(173, 190, 216)");
    await addPhotoButton.click();

    // Find the actual input used by Add Photo button
    const fileInput = page.locator('input[type="file"]');

    // Add a file without opening a dialog box
    await fileInput.setInputFiles("fixtures/dog-photo-original.jpg");

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
    await publishButton.click();

    // Verify post is published
    await page
      .getByText("Ваш пост успішно опубліковано!")
      .waitFor({ state: "visible" });
    await expect(page.locator(".close-icon")).toBeVisible();
    await page.locator(".close-icon").click();

    await page
      .getByText("Ваш пост успішно опубліковано!")
      .waitFor({ state: "hidden" });

    // Delete the created post to clean up
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
  });
});
