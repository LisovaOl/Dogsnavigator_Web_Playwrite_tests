import { test, expect } from "../../fixtures/auth.fixture";
import { findPostByAuthor } from "./posts-functions";
import { PostPopup } from "../../pages/PostPopup";

test.describe(
  "My Posts. View, Edit, Add comment",
  { tag: ["@functional", "@ui"] },
  () => {
    test("DN-010 View My Post. UI", async ({ page }) => {
      const myPostPopup = new PostPopup(page.locator("body"));

      await page.getByRole("link", { name: "Профіль Собаки" }).click();
      await expect(
        page.getByRole("heading", { name: "Мій собака" })
      ).toBeVisible();

      await myPostPopup.openMyFirstPostPopup();

      await expect(page.locator(".info-container")).toBeVisible();
      await expect(myPostPopup.postImage).toBeVisible();

      await myPostPopup.closeMyPostPost();
      await expect(myPostPopup.postImage).not.toBeVisible();
    });
  }
);
