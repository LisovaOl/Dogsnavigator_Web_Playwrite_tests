import { Locator, Page, expect } from "@playwright/test";

export class PostCard {
  readonly root: Locator;

  readonly authorName: Locator;
  readonly followButton: Locator;
  readonly postText: Locator;
  readonly likeButton: Locator;
  readonly commentButton: Locator;
  readonly moreButton: Locator;
  readonly postImage: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.authorName = root.locator(".author-name");
    this.followButton = root.locator(".post-follow-btn");
    this.postText = root.locator(".post-text");
    this.likeButton = root.getByRole("button", { name: " Подобається " });
    this.commentButton = root.locator(".comment-btn");
    this.moreButton = root.locator(".more-btn");
    this.postImage = root.locator(".post-photo");
  }

  async getAuthorName(): Promise<string> {
    return (await this.authorName.textContent())?.trim() ?? "";
  }

  async follow(): Promise<void> {
    await this.followButton.click();
  }

  async like(): Promise<void> {
    await this.likeButton.click();
  }

  async openComments(): Promise<void> {
    await this.commentButton.click();
  }

  async openMoreMenu(): Promise<void> {
    await this.moreButton.click();
  }

  async expectTextContains(text: string) {
    await expect(this.postText).toContainText(text);
  }
}
