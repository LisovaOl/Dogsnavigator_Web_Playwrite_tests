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
