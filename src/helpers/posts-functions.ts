import { Page } from "@playwright/test";

// Scroll
async function loadAllRecommendationPostsWithScroll(page: Page) {
  let previousCount = 0;
  let sameCountIterations = 0;

  while (sameCountIterations < 5) {
    const posts = page.locator("ul.list.posts");
    const count = await posts.count();
    //console.log("POSTS COUNT NOW:", count);

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

  //console.log("FINAL POSTS COUNT:", previousCount);
}

export async function findPostByAuthor(page: Page, name: string) {
  // 1. Кроково докручуємо сторінку, поки нові пости припинять зʼявлятись
  await loadAllRecommendationPostsWithScroll(page);

  const posts = page.locator("li.post").filter({
    has: page.locator(".author-name", { hasText: name }),
  });

  return posts; // 👈 ВАЖЛИВО
}
