import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Sidebar extends BasePage {
  async goToMyDogProfile() {
    await this.page.getByRole("link", { name: "Профіль Собаки" }).click();
    await expect(
      this.page.getByRole("heading", { name: "Мій собака" }),
    ).toBeVisible();
  }

  async goToProfile() {
    await this.page
      .getByRole("link", { name: "Мій Профіль", exact: true })
      .click();
    await expect(
      this.page.getByRole("heading", { name: "Мій Профіль" }),
    ).toBeVisible();
  }
}
