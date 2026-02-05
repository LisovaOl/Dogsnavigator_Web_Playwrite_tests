import { test, expect } from "../../fixtures/auth.fixture";
import { findPostByAuthor } from "../../../src/helpers/posts-functions";
import { PostCard } from "../../../src/pages/PostCard";

test.describe("List of Posts tests", { tag: ["@functional", "@ui"] }, () => {
  test("DN-007 Scroll the list of posts", async ({ page }) => {
    const authorName = "Боня";

    const authorPosts = await findPostByAuthor(page, authorName);

    const count = await authorPosts.count();
    console.log("AUTHOR POSTS COUNT:", count);

    await expect(count).toBeGreaterThan(0);
    //await expect(count).toBe(4);

    // додатково
    await expect(authorPosts.first()).toBeVisible();
    await expect(authorPosts.nth(1)).toBeVisible();
  });

  test("DN-008 Like and dislike post", async ({ page }) => {
    const post = page
      .locator("li.post")
      .filter({
        has: page.locator(".author-name", { hasText: "Боня" }),
      })
      .first();

    const postCard = new PostCard(post);
    const isLiked = await postCard.likeButton.evaluate((el) =>
      el.classList.contains("liked"),
    );

    if (isLiked) {
      await expect(postCard.likeButton).toHaveCSS("color", "rgb(255, 83, 100)"); // червоний
    } else {
      await expect(postCard.likeButton).toHaveCSS("color", "rgb(21, 58, 114)"); // сірий
    }

    if (!isLiked) {
      await postCard.like();
    } else {
      await postCard.like();
    }
  });
  test("DN-009 Add comment to the post", async ({ page }) => {
    const post = page
      .locator("li.post")
      .filter({
        has: page.locator(".author-name", { hasText: "Боня" }),
      })
      .first();
    const postCard = new PostCard(post);
    await postCard.addComments();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Боня, Далматин7 Січня 2026" })
        .nth(4),
    ).toBeVisible();
  });
});
