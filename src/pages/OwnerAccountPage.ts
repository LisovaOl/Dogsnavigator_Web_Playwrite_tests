import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OwnerAccountPage extends BasePage {
  readonly ownerName: Locator = this.page.locator("#username");
  readonly saveButton: Locator = this.page.getByRole("button", {
    name: "Зберегти",
  });
  readonly ownerAccount: Locator = this.page.getByRole("link", {
    name: "Мій обліковий запис",
  });
  readonly city: Locator = this.page.getByPlaceholder("Місто");

  async goToOwnerAccount() {
    await this.ownerAccount.click();
  }

  async getOwnerName(): Promise<string> {
    const name = await this.ownerName.inputValue();
    return name.trim();
  }

  async changeOwnerName(newOwnerName: string): Promise<void> {
    await this.ownerName.fill(newOwnerName);
    await this.saveButton.click();
  }
}
