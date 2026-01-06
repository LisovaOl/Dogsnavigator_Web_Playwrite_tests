import { Page, Locator, expect } from "@playwright/test";

export class Post {
  private readonly page: Page;

  // Locators
  addPostButton: Locator;
  addPhotoButton: Locator;
  publishButton: Locator;
  successPublishPostNotification: Locator;
  closeIcon: Locator;
  fileInput: Locator;
  deletePostButton: Locator;
  acceptDeleteNotification: Locator;
  acceptDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addPostButton = page.getByRole("button", {
      name: " Додати Пост ",
    });
    this.addPhotoButton = page.locator(".add-photo-btn");
    this.publishButton = page.getByRole("button", { name: "ОПУБЛІКУВАТИ" });
    this.successPublishPostNotification = page.getByText(
      "Ваш пост успішно опубліковано!"
    );
    this.closeIcon = page.locator(".close-icon");
    this.fileInput = page.locator('input[type="file"]');
    this.deletePostButton = page.getByRole("button").nth(3);
    this.acceptDeleteNotification = page.getByText(
      "Ви впевнені, що хочете видалити цей пост?"
    );
    this.acceptDeleteButton = page.getByRole("button", { name: "ВИДАЛИТИ" });
  }
}
