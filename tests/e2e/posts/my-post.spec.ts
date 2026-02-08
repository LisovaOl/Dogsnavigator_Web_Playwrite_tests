import { test, expect } from "../../fixtures/auth.fixture";
import { Sidebar } from "../../../src/pages/Sidebar";
import { PostPopupPage } from "../../../src/pages/PostPopupPage";

test.describe(
  "My Posts. View, Edit, Add comment",
  { tag: ["@functional", "@ui"] },
  () => {
    test("DN-010 Open/Close My Post. UI", async ({ page }) => {
      const goToMyDogProfile = new Sidebar(page);
      const myPostPopup = new PostPopupPage(page.locator("body"));

      await test.step("Open My Dog Profile", async () => {
        await goToMyDogProfile.goToMyDogProfile();
      });

      await test.step("Open first post and verify post UI", async () => {
        await myPostPopup.openMyFirstPostPopup();

        await expect(page.locator(".info-container")).toBeVisible();
        await expect(myPostPopup.postImage).toBeVisible();
      });

      await test.step("Close post popup and verify it is closed", async () => {
        await myPostPopup.closeMyPost();
        await expect(myPostPopup.postImage).toBeHidden();
      });
    });

    test("DN-011 Add / Delete comment in the My Post", async ({ page }) => {
      const goToMyDogProfile = new Sidebar(page);
      const myPostPopup = new PostPopupPage(page.locator("body"));
      const textForComment = "New comment";

      await test.step("Open My Dog Profile", async () => {
        await goToMyDogProfile.goToMyDogProfile();
      });

      await test.step("Open first post and verify post UI + empty comments state", async () => {
        await myPostPopup.openMyFirstPostPopup();

        await expect(page.locator(".info-container")).toBeVisible();
        await expect(myPostPopup.postImage).toBeVisible();

        await expect(myPostPopup.emptyCommentsPlaceholder).toBeVisible({
          timeout: 30_000,
        });
      });

      await test.step("Add comment and verify it is displayed", async () => {
        await myPostPopup.addComment(textForComment);

        await expect(myPostPopup.commentText).toHaveText(textForComment);
        await expect(myPostPopup.commentText).toBeVisible();
      });

      await test.step("Delete comment and verify empty comments state (cleanup)", async () => {
        await myPostPopup.deleteBtn.nth(1).click();

        // wait until comment disappears
        await expect(myPostPopup.commentText).toBeHidden({ timeout: 30_000 });

        // then wait for empty state placeholder
        await expect(myPostPopup.emptyCommentsPlaceholder).toBeVisible({
          timeout: 30_000,
        });
      });

      await test.step("Close post popup", async () => {
        await myPostPopup.closeMyPost();
        await expect(myPostPopup.postImage).toBeHidden();
      });
    });
  },
);
