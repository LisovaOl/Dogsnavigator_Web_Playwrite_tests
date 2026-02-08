import { test, expect } from "../../fixtures/auth.fixture";
import { findPostByAuthor } from "../../../src/helpers/posts-functions";
import { PostCardPage } from "../../../src/pages/PostCardPage";

test.describe("List of Posts tests", { tag: ["@functional", "@ui"] }, () => {
  const authorName = "Боня";

  test("DN-007 Scroll the list of posts", async ({ page }) => {
    const authorPosts = await findPostByAuthor(page, authorName);

    const count = await authorPosts.count();
    console.log("AUTHOR POSTS COUNT:", count);

    expect(count).toBeGreaterThan(0);

    // додатково
    await expect(authorPosts.first()).toBeVisible();
    await expect(authorPosts.nth(1)).toBeVisible();
  });

  test("DN-008 Like and dislike post", async ({ page }) => {
    const post = page
      .locator("li.post")
      .filter({
        has: page.locator(".author-name", { hasText: authorName }),
      })
      .first();

    const postCard = new PostCardPage(post);

    await test.step("Verify like button initial state (liked or not liked)", async () => {
      const color = await postCard.likeButton.evaluate(
        (el) => getComputedStyle(el).color,
      );

      // liked (red) or not liked (gray/blue)
      expect(["rgb(255, 83, 100)", "rgb(21, 58, 114)"]).toContain(color);
    });

    await test.step("Toggle like state", async () => {
      await postCard.like();
    });
  });

  test("DN-009 Add comment to the post", async ({ page }) => {
    const post = page
      .locator("li.post")
      .filter({
        has: page.locator(".author-name", { hasText: authorName }),
      })
      .first();

    const postCard = new PostCardPage(post);

    await test.step("Add comment to the post", async () => {
      await postCard.addComments();
    });

    await test.step("Verify new comment is visible under the post", async () => {
      await expect(
        page
          .locator("div")
          .filter({ hasText: `${authorName}, Далматин7 Січня 2026` })
          .nth(4),
      ).toBeVisible();
    });
  });
});
