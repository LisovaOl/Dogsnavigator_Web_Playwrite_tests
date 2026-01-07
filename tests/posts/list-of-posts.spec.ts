import { test, expect } from "../../fixtures/auth.fixture";
import { findPostByAuthor } from "./posts-functions";
import { PostCard } from "../../pages/PostCard";

test.describe("List of Posts tests", { tag: ["@functional", "@ui"] }, () => {
  test("DN-007 Scroll the list of posts", async ({ page }) => {
    const authorName = "Бакс";

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
    await expect(postCard.likeButton).not.toHaveClass("liked");
    await expect(postCard.likeButton).toHaveCSS("color", "rgb(21, 58, 114)");

    await postCard.like();
    await expect(postCard.likeButton).toHaveClass("liked");
    await expect(postCard.likeButton).toHaveCSS("color", "rgb(255, 83, 100)");

    await postCard.like();
    await expect(postCard.likeButton).not.toHaveClass("liked");
    await expect(postCard.likeButton).toHaveCSS("color", "rgb(21, 58, 114)");
  });
});
