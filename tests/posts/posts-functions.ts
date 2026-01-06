import { expect, test, Page } from "@playwright/test";

// Scroll
async function loadAllPostsWithScroll(page: Page) {
  let previousCount = 0;
  let sameCountIterations = 0;

  while (sameCountIterations < 5) {
    const posts = page.locator("li.post");
    const count = await posts.count();
    console.log("POSTS COUNT NOW:", count);

    if (count === previousCount) {
      sameCountIterations++;
    } else {
      sameCountIterations = 0;
    }

    previousCount = count;

    // 👇 тут “живий” скрол, як користувач колесом миші
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(1000);
  }

  console.log("FINAL POSTS COUNT:", previousCount);
}

export async function findPostByAuthor(page: Page, name: string) {
  // 1. Кроково докручуємо сторінку, поки нові пости припинять зʼявлятись
  await loadAllPostsWithScroll(page);

  // 2. Після цього шукаємо автора
  const posts = page.locator("li.post");
  const total = await posts.count();
  console.log("TOTAL POSTS AFTER SCROLL:", total);

  const post = posts.filter({
    has: page.locator(".author-name", { hasText: name }),
  });

  const matchCount = await post.count();
  console.log(`MATCHING POSTS FOR "${name}":`, matchCount);

  //await expect(post.first()).toBeVisible();
  return post.first();
}
