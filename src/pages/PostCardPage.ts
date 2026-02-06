import { Locator, expect } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class PostCardPage extends BaseComponent {
  readonly authorName: Locator = this.root.locator(".author-name");
  readonly followButton: Locator = this.root.locator(".post-follow-btn");
  readonly postText: Locator = this.root.locator(".post-text");
  readonly likeButton: Locator = this.root.getByRole("button", {
    name: " Подобається ",
  });
  readonly commentButton: Locator = this.root.locator(".comment-btn");
  readonly moreButton: Locator = this.root.locator(".more-btn");
  readonly postImage: Locator = this.root.locator(".post-photo");

  async getAuthorName(): Promise<string> {
    return (await this.authorName.textContent())?.trim() ?? "";
  }

  async follow(): Promise<void> {
    await this.followButton.click();
  }

  async like(): Promise<void> {
    await this.likeButton.click();
  }

  async addComments(): Promise<void> {
    await this.commentButton.click();
  }

  async openMoreMenu(): Promise<void> {
    await this.moreButton.click();
  }

  async expectTextContains(text: string) {
    await expect(this.postText).toContainText(text);
  }
}
