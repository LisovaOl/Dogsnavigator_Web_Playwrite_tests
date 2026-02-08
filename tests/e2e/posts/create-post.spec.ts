import { test, expect } from "../../fixtures/auth.fixture";
import { PostPage } from "../../../src/pages/PostPage";
import { Sidebar } from "../../../src/pages/Sidebar";

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
      const goToMyDogProfile = new Sidebar(page);
      const addPost = new PostPage(page);

      await test.step("Open Add Post → Add Photo", async () => {
        await addPost.clickOnAddPostButton();
        await addPost.clickOnAddPhotoButton();
      });

      await test.step("Upload photo from fixtures and verify preview", async () => {
        await addPost.uploadPhotoFromFixture();
        await expect(page.locator(".photo-preview")).toBeVisible();
      });

      await test.step("Fill post text and verify value", async () => {
        const postText = "This is a test post with photo.";
        const textbox = page.getByRole("textbox");

        await textbox.fill(postText);
        await expect(textbox).toHaveValue(postText);
      });

      await test.step("Publish the post and verify success notification", async () => {
        await addPost.clickOnPublishButton();
        await addPost.successfullyPublishPostNotification();
      });

      await test.step("Go to My Dog Profile", async () => {
        await goToMyDogProfile.goToMyDogProfile();
      });

      await test.step("Delete the first post and verify it is removed", async () => {
        await addPost.firstPost.click();
        await addPost.clickDeleteButton();

        await expect(addPost.acceptDeleteNotification).toBeVisible();

        await addPost.clickConfirmDelete();

        await expect(addPost.acceptDeleteNotification).toBeHidden();
      });
    });

    test("DN-005 Edit Text post", async ({ page }) => {
      const goToMyDogProfile = new Sidebar(page);
      const addPost = new PostPage(page);

      const postText = "This is a test post with photo.";
      const newText = "New Text";

      await test.step("Create a post: open Add Post, add photo, upload fixture", async () => {
        await addPost.clickOnAddPostButton();
        await addPost.clickOnAddPhotoButton();
        await addPost.uploadPhotoFromFixture();
      });

      await test.step("Fill post text and verify", async () => {
        const textbox = page.getByRole("textbox");
        await textbox.fill(postText);
        await expect(textbox).toHaveValue(postText);
      });

      await test.step("Publish post and verify success notification", async () => {
        await addPost.clickOnPublishButton();
        await addPost.successfullyPublishPostNotification();
      });

      await test.step("Go to My Dog Profile", async () => {
        await goToMyDogProfile.goToMyDogProfile();
      });

      await test.step("Open first/last post and verify content + edit button", async () => {
        await addPost.firstPost.click();
        await expect(page.locator("img.post-image")).toBeVisible();
        await expect(page.getByText(postText)).toBeVisible();
        await expect(page.locator(".edit-btn")).toBeVisible();
      });

      await test.step("Open Edit mode and replace text", async () => {
        await page.locator(".edit-btn").click();

        await expect(page.getByText("Редагування поста")).toBeVisible();

        const formTextbox = page.locator("form").getByRole("textbox");
        await expect(formTextbox).toHaveValue(postText);

        await formTextbox.fill(newText);

        await addPost.clickOnPublishButton();
      });

      await test.step("Verify updated text after publish and close post view", async () => {
        await expect(page.locator("img.post-image")).toBeVisible();

        const formTextbox = page.locator("form").getByRole("textbox");
        await expect(formTextbox).toHaveValue(newText);

        await page.getByRole("button").nth(1).click();
      });

      await test.step("Cleanup: delete created post", async () => {
        await addPost.firstPost.click();
        await addPost.clickDeleteButton();
        await expect(addPost.acceptDeleteNotification).toBeVisible();
        await addPost.clickConfirmDelete();
        await expect(addPost.acceptDeleteNotification).toBeHidden();
      });
    });

    test("DN-006 Verify notification when adding more than 5 posts with photos", async ({
      page,
    }) => {
      const goToMyDogProfile = new Sidebar(page);
      const addPost = new PostPage(page);

      await test.step("Create 5 posts with photos", async () => {
        for (let i = 1; i <= 5; i++) {
          await addPost.clickOnAddPostButton();
          await addPost.clickOnAddPhotoButton();
          await addPost.uploadPhotoFromFixture();
          await addPost.clickOnPublishButton();
          await addPost.successfullyPublishPostNotification();
        }
      });

      await test.step("Try to create 6th post and verify limit notification", async () => {
        await addPost.clickOnAddPostButton();
        await addPost.clickOnAddPhotoButton();
        await addPost.uploadPhotoFromFixture();
        await addPost.clickOnPublishButton();

        await expect(addPost.limitPostMessage).toBeVisible();
        await expect(
          page.getByText(
            "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра.",
          ),
        ).toBeVisible();
      });

      await test.step("Close limit notification popup", async () => {
        await expect(addPost.closeIcon).toBeVisible();
        await addPost.closeIcon.click();

        await expect(page.getByText("Створення публікації")).toBeVisible();

        await expect(addPost.closeButton).toBeVisible();
        await addPost.closeButton.click();
      });

      await test.step("Cleanup: delete 5 created posts", async () => {
        for (let i = 1; i <= 5; i++) {
          await goToMyDogProfile.goToMyDogProfile();
          await addPost.firstPost.click();
          await addPost.clickDeleteButton();
          await addPost.clickConfirmDelete();
        }
      });
    });
  },
);
