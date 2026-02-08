import { Locator, expect } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";
export class PostPopupPage extends BaseComponent {
  readonly firstPost: Locator = this.root.locator("li > img").first();
  readonly creatorName: Locator = this.root.locator(".creator-dog-info");
  readonly commentText: Locator = this.root.locator(".comment-text");
  readonly emptyCommentsPlaceholder: Locator = this.root.getByText(
    "Поки Немає Коментарів",
  );
  readonly editBtn: Locator = this.root.locator(".edit-btn");
  readonly deleteBtn: Locator = this.root.locator(".delete-btn");
  readonly postImage: Locator = this.root.locator(".post-image");
  readonly postText: Locator = this.root.locator(".post-text");
  readonly likeButton: Locator = this.root.getByRole("button", {
    name: " Подобається ",
  });
  readonly commentContainer: Locator = this.root.locator(
    ".comment-input-container",
  );
  readonly commentInputField: Locator = this.root.getByRole("textbox", {
    name: "Залиште коментар",
  });
  readonly commentSendButton: Locator = this.root.locator(".send-btn");
  readonly closePopupButton: Locator = this.root.locator(".close-btn");

  async openMyFirstPostPopup() {
    await this.firstPost.click();
  }

  async getAuthorName(): Promise<string> {
    return (await this.creatorName.textContent())?.trim() ?? "";
  }

  async closeMyPost(): Promise<void> {
    await this.closePopupButton.click();
  }

  async addComment(text: string) {
    await this.commentInputField.fill(text);
    await this.commentSendButton.click();
  }

  async expectTextContains(text: string) {
    await expect(this.postText).toContainText(text);
  }
}
