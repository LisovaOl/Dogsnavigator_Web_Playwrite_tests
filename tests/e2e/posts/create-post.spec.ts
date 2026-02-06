import { test, expect } from "../../fixtures/auth.fixture";
import { PostPage } from "../../../src/pages/PostPage";
import { goToMyDogProfileFromSidebar } from "../../../src/pages/Sidebar";

test.describe(
  "Create, Edit, Delete, Limit Post tests.",
  { tag: ["@functional", "@ui"] },
  () => {
    test("DN-003 Verify create post popup-UI", async ({ page }) => {
      const addPost = new PostPage(page);

      await addPost.clickOnAddPostButton();

      await expect(page.getByText("Створення публікації")).toBeVisible();
      await expect(page.getByText("Що у вас нового?")).toBeVisible();
      await expect(page.getByRole("textbox")).toBeVisible();
      await expect(addPost.publishButton).toBeVisible();

      await addPost.closeButton.click();
      await expect(page.getByText("Створення публікації")).toBeHidden();
    });

    test("DN-004 Add and Delete post with photo and text", async ({ page }) => {
      const addPost = new PostPage(page);

      await addPost.clickOnAddPostButton();
      await addPost.clickOnAddPhotoButton();

      await addPost.uploadPhotoFromFixture();

      await expect(page.locator(".photo-preview")).toBeVisible();

      // Add text to the post
      const postText = "This is a test post with photo.";
      await page.getByRole("textbox").fill(postText);
      await expect(page.getByRole("textbox")).toHaveValue(postText);

      // Publish the post
      await addPost.clickOnPublishButton();

      // Verify success notification is visible and post is published
      await addPost.successfullyPublishPostNotification();

      // Delete the created post to clean up
      await goToMyDogProfileFromSidebar(page);

      await addPost.firstPost.click();
      await addPost.clickDeleteButton();
      await expect(addPost.acceptDeleteNotification).toBeVisible();
      await addPost.clickConfirmDelete();
      await expect(addPost.acceptDeleteNotification).toBeHidden();
    });

    test("DN-005 Edit Text post", async ({ page }) => {
      const addPost = new PostPage(page);

      await addPost.clickOnAddPostButton();
      await addPost.clickOnAddPhotoButton();
      await addPost.uploadPhotoFromFixture();

      // Add text to the post
      const postText = "This is a test post with photo.";
      await page.getByRole("textbox").fill(postText);
      await expect(page.getByRole("textbox")).toHaveValue(postText);

      // Publish post
      await addPost.clickOnPublishButton();
      await addPost.successfullyPublishPostNotification();

      // Go to profile
      await goToMyDogProfileFromSidebar(page);

      // Open Last published post
      await addPost.firstPost.click();
      await expect(page.locator("img.post-image")).toBeVisible();

      await expect(page.getByText(postText)).toBeVisible();
      await expect(page.locator(".edit-btn")).toBeVisible();
      await page.locator(".edit-btn").click();

      await expect(page.getByText("Редагування поста")).toBeVisible();
      await expect(page.locator("form").getByRole("textbox")).toHaveValue(
        postText,
      );
      await page.locator("form").getByRole("textbox").fill("New Text");

      await addPost.clickOnPublishButton();

      await expect(page.locator("img.post-image")).toBeVisible();
      await expect(page.locator("form").getByRole("textbox")).toHaveValue(
        "New Text",
      );
      await page.getByRole("button").nth(1).click();

      // Delete the created post to clean up
      await addPost.firstPost.click();
      await addPost.clickDeleteButton();
      await expect(addPost.acceptDeleteNotification).toBeVisible();
      await addPost.clickConfirmDelete();
      await expect(addPost.acceptDeleteNotification).toBeHidden();
    });

    test("DN-006 Verify notification when adding more than 5 posts with photos", async ({
      page,
    }) => {
      const addPost = new PostPage(page);

      // Add 5 posts
      let i = 0;
      while (i < 5) {
        await addPost.clickOnAddPostButton();
        await addPost.clickOnAddPhotoButton();
        await addPost.uploadPhotoFromFixture();
        await addPost.clickOnPublishButton();
        await addPost.successfullyPublishPostNotification();
        i++;
      }

      // Add sixth post
      await addPost.clickOnAddPostButton();
      await addPost.clickOnAddPhotoButton();
      await addPost.uploadPhotoFromFixture();
      await addPost.clickOnPublishButton();

      // Message "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра." appeared
      await addPost.limitPostMessage.waitFor({ state: "visible" });

      // Close "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра." popup
      await expect(addPost.closeIcon).toBeVisible();
      await addPost.closeIcon.click();
      await expect(page.getByText("Створення публікації")).toBeVisible();

      // Close add post popup
      await expect(addPost.closeButton).toBeVisible();
      await addPost.closeButton.click();

      // Delete added posts - Clean up
      let el = 0;
      while (el < 5) {
        await goToMyDogProfileFromSidebar(page);
        await addPost.firstPost.click();
        await addPost.clickDeleteButton();
        await addPost.clickConfirmDelete();
        el++;
      }
    });
  },
);
