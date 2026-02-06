import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PostPage extends BasePage {
  readonly addPostButton: Locator = this.page.getByRole("button", {
    name: " Додати Пост ",
  });
  readonly addPhotoButton: Locator = this.page.locator(".add-photo-btn");
  readonly publishButton: Locator = this.page.getByRole("button", {
    name: "ОПУБЛІКУВАТИ",
  });
  readonly successPublishPostNotification: Locator = this.page.getByText(
    "Ваш пост успішно опубліковано!",
  );
  readonly closeIcon: Locator = this.page.locator(".close-icon");
  readonly closeButton: Locator = this.page.locator(".close-btn");
  readonly fileInput: Locator = this.page.locator('input[type="file"]');
  readonly firstPost: Locator = this.page.locator(
    "//app-pet-page-publications-tab/ul/li[1]",
  );
  readonly deletePostButton: Locator = this.page.getByRole("button").nth(3);
  readonly acceptDeleteNotification: Locator = this.page.getByText(
    "Ви впевнені, що хочете видалити цей пост?",
  );
  readonly acceptDeleteButton: Locator = this.page.getByRole("button", {
    name: "ВИДАЛИТИ",
  });
  readonly limitPostMessage: Locator = this.page.getByText(
    "Ви досягли ліміту публікацій на сьогодні. Спробуйте завтра.",
  );

  // Click Add Post button
  async clickOnAddPostButton(): Promise<void> {
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
    await this.closeIcon.click();
    await this.successPublishPostNotification.waitFor({ state: "hidden" });
  }

  // Click delete button
  async clickDeleteButton(): Promise<void> {
    await this.deletePostButton.click();
  }

  // Click confirm delete button
  async clickConfirmDelete(): Promise<void> {
    await this.acceptDeleteButton.click();
  }
}
