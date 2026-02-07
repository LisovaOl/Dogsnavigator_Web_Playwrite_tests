import { Locator, expect } from "@playwright/test";
import { goToMyDogProfileFromSidebar } from "./Sidebar";
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

    // чекати, що збереглось: або toast, або апдейт поля
  }

  async setNewCity(): Promise<void> {
    await this.city.fill("дні");

    await this.page.getByText("Дніпро", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(this.page);

    await expect(this.page.locator(".owner-location-age")).toContainText(
      "Дніпро",
    );
  }

  async setOldCity(): Promise<void> {
    await this.city.fill("біла");

    await this.page.getByText("Біла Церква", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(this.page);

    await expect(this.page.locator(".owner-location-age")).toContainText(
      "Біла Церква",
    );
  }
}
