import { Locator, Page, expect } from "@playwright/test";

export class PostPopup {
  readonly root: Locator;

  //myProfile: Locator;
  readonly firstPost: Locator;
  readonly creatorName: Locator;
  readonly editBtn: Locator;
  readonly deleteBtn: Locator;
  readonly postImage: Locator;
  readonly postText: Locator;
  readonly likeButton: Locator;
  readonly commentContainer: Locator;
  readonly commentInputField: Locator;
  readonly commentSendButton: Locator;
  readonly closePopupButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    //this.myProfile = root.getByRole("link", { name: "Профіль Собаки" });
    this.firstPost = root.locator("li > img").first();
    this.creatorName = root.locator(".creator-dog-info");
    this.editBtn = root.locator(".edit-btn");
    this.deleteBtn = root.locator(".delete-btn");
    this.postImage = root.locator(".post-image");
    this.postText = root.locator(".post-text");
    this.likeButton = root.getByRole("button", { name: " Подобається " });
    this.commentContainer = root.locator(".comment-input-container");
    this.commentInputField = root.getByRole("textbox", {
      name: "Залиште коментар",
    });
    this.commentSendButton = root.locator(".send-btn");
    this.closePopupButton = root.locator(".close-btn");
  }
  async openMyFirstPostPopup() {
    await this.firstPost.click();
  }
  async getAuthorName(): Promise<string> {
    return (await this.creatorName.textContent())?.trim() ?? "";
  }

  async closeMyPostPost(): Promise<void> {
    await this.closePopupButton.click();
  }
  async like(): Promise<void> {
    await this.likeButton.click();
  }

  async expectTextContains(text: string) {
    await expect(this.postText).toContainText(text);
  }
}
