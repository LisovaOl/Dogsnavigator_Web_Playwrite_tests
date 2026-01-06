import { expect, test, Page } from "@playwright/test";

export async function uploadPhotoFromFixture(page: Page) {
  // Find the actual input used by Add Photo button
  const fileInput = page.locator('input[type="file"]');

  // Add a file without opening a dialog box
  await fileInput.setInputFiles("fixtures/dog-photo-original.jpg");
}

export async function deletePost(page: Page) {
  await page.locator("//app-pet-page-publications-tab/ul/li[1]").click();
  await expect(page.locator("img.post-image")).toBeVisible();
  await page.getByRole("button").nth(3).click();

  await expect(
    page.getByText("Ви впевнені, що хочете видалити цей пост?")
  ).toBeVisible();
  await page.getByRole("button", { name: "ВИДАЛИТИ" }).click();
  await expect(
    page.getByText("Ви впевнені, що хочете видалити цей пост?")
  ).toBeHidden();
}

export async function closeSuccessPostNotification(page: Page) {
  await page
    .getByText("Ваш пост успішно опубліковано!")
    .waitFor({ state: "visible" });
  await expect(page.locator(".close-icon")).toBeVisible();
  await page.locator(".close-icon").click();
  await page
    .getByText("Ваш пост успішно опубліковано!")
    .waitFor({ state: "hidden" });
}

export async function clickOnAddPostButton(page: Page) {
  await page
    .getByRole("button", {
      name: " Додати Пост ",
    })
    .click();
}

export async function clickOnAddPhotoButton(page: Page) {
  await page.locator(".add-photo-btn").click();
}

export async function clickOnPublishButton(page: Page) {
  await page.getByRole("button", { name: "ОПУБЛІКУВАТИ" }).click();
}
// export async function getAuthor(page: Page, name: string) {
//   const author = page.locator(".list flex-column posts").filter({
//     has: page.locator(".author-name", { hasText: name }),
//   });
//   console.log(author);
//   await expect(author).toBeVisible();
// }

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
