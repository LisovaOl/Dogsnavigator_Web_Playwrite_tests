import { test, expect } from "../../fixtures/auth.fixture";
import { Sidebar } from "../../../src/pages/Sidebar";
import { PostPopupPage } from "../../../src/pages/PostPopupPage";

test.describe(
  "My Posts. View, Edit, Add comment",
  { tag: ["@functional", "@ui"] },
  () => {
    test("DN-010 Open/Close My Post. UI", async ({ page }) => {
      const goToMyDogProfile = new Sidebar(page);

      await goToMyDogProfile.goToMyDogProfile();

      const myPostPopup = new PostPopupPage(page.locator("body"));

      await myPostPopup.openMyFirstPostPopup();

      await expect(page.locator(".info-container")).toBeVisible();
      await expect(myPostPopup.postImage).toBeVisible();

      await myPostPopup.closeMyPost();
      await expect(myPostPopup.postImage).toBeHidden();
    });

    test("DN-011 Add / Delete comment in the My Post", async ({ page }) => {
      const goToMyDogProfile = new Sidebar(page);

      await goToMyDogProfile.goToMyDogProfile();

      const myPostPopup = new PostPopupPage(page.locator("body"));

      await myPostPopup.openMyFirstPostPopup();

      await expect(page.locator(".info-container")).toBeVisible();
      await expect(myPostPopup.postImage).toBeVisible();
      await expect(myPostPopup.emptyCommentsPlaceholder).toBeVisible({
        timeout: 30_000,
      });

      const textForComment = "New comment";
      await myPostPopup.addComment(textForComment);

      await expect(myPostPopup.commentText).toHaveText(textForComment);
      await expect(myPostPopup.commentText).toBeVisible();

      // delete comment (clean up)
      await myPostPopup.deleteBtn.nth(1).click();

      // чекати, що текст коментаря зник
      await expect(myPostPopup.commentText).toBeHidden({ timeout: 30_000 });

      // і тільки потім чекати плейсхолдер
      await expect(myPostPopup.emptyCommentsPlaceholder).toBeVisible({
        timeout: 30_000,
      });

      await myPostPopup.closeMyPost();
      await expect(myPostPopup.postImage).toBeHidden();
    });
  },
);
