import { Page, Locator, expect } from "@playwright/test";

export class Post {
  private readonly page: Page;

  // Locators
  addPostButton: Locator;
  addPhotoButton: Locator;
  publishButton: Locator;
  successPublishPostNotification: Locator;
  closeIcon: Locator;
  closeButton: Locator;
  fileInput: Locator;
  deletePostButton: Locator;
  acceptDeleteNotification: Locator;
  acceptDeleteButton: Locator;
  limitPostMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addPostButton = page.getByRole("button", {
      name: " Додати Пост ",
    });
    this.addPhotoButton = page.locator(".add-photo-btn");
    this.publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });
    this.successPublishPostNotification = page.getByText(
      "Ваш пост успішно опубліковано!",
    );
    this.closeIcon = page.locator(".close-icon");
    this.closeButton = page.locator(".close-btn");
    this.fileInput = page.locator('input[type="file"]');
    this.deletePostButton = page.getByRole("button").nth(3);
    this.acceptDeleteNotification = page.getByText(
      "Ви впевнені, що хочете видалити цей пост?",
    );
    this.acceptDeleteButton = page.getByRole("button", { name: "ВИДАЛИТИ" });
    this.limitPostMessage = page.getByText(
      "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра.",
    );
  }
  // Click Add Post button
  async clickOnAddPostButton(): Promise<void> {
    await expect(this.addPostButton).toBeVisible();
    await this.addPostButton.click();
  }

  // Click Add Photo Button
  async clickOnAddPhotoButton(): Promise<void> {
    await this.addPhotoButton.click();
  }

  // Upload file to the post
  async uploadPhotoFromFixture(): Promise<void> {
    await this.fileInput.setInputFiles(
      "src/test-data/images/dog-photo-original.jpg",
    );
  }

  // Click Publish button
  async clickOnPublishButton(): Promise<void> {
    await this.publishButton.click();
  }

  // Close Success Message
  async successfullyPublishPostNotification(): Promise<void> {
    await this.successPublishPostNotification.waitFor({ state: "visible" });
    await expect(this.closeIcon).toBeVisible();
    await this.closeIcon.click();
    await this.successPublishPostNotification.waitFor({ state: "hidden" });
  }

  // Delete post from dog profile
  async deletePost(page: Page) {
    await page.locator("//app-pet-page-publications-tab/ul/li[1]").click();
    await expect(page.locator("img.post-image")).toBeVisible();
    await page.getByRole("button").nth(3).click();

    await expect(
      page.getByText("Ви впевнені, що хочете видалити цей пост?"),
    ).toBeVisible();
    await page.getByRole("button", { name: "ВИДАЛИТИ" }).click();
    await expect(
      page.getByText("Ви впевнені, що хочете видалити цей пост?"),
    ).toBeHidden();
  }

  async goToProfilePage(page: Page) {
    const profileDogLink = page.locator("#menu-bar").getByRole("link", {
      name: "Профіль Собаки",
    });
    await profileDogLink.click();
  }
}
