import { Locator, expect } from "@playwright/test";
import { goToMyDogProfileFromSidebar } from "./Sidebar";
import { BasePage } from "./BasePage";

export class OwnerAccountPage extends BasePage {
  readonly userName: Locator = this.page.locator("#username");
  readonly saveButton: Locator = this.page.getByRole("button", {
    name: "Зберегти",
  });
  readonly ownerAccount: Locator = this.page.getByRole("link", {
    name: "Мій обліковий запис",
  });
  city: Locator = this.page.getByPlaceholder("Місто");

  async goToOwnerAccount() {
    await this.ownerAccount.click();
  }

  async getOwnerName(): Promise<string> {
    const oldUserName = await this.userName.inputValue();
    return oldUserName.trim();
  }

  makeDifferentName(oldUserName: string): string {
    const base = oldUserName.trim();
    const suffix = Date.now().toString().slice(-6); // коротко
    // якщо є ліміт довжини — обрізай
    return `${base}-${suffix}`.slice(0, 9);
  }

  async changeOwnerName(newUserName: string): Promise<void> {
    await this.userName.fill(newUserName);
    await this.saveButton.click();

    // чекати, що збереглось: або toast, або апдейт поля
    await expect(this.userName).toHaveValue(newUserName, { timeout: 30_000 });
  }

  async setNewCity(): Promise<void> {
    await this.city.fill("дні");

    await this.page.getByText("Дніпро", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(this.page);

    await expect(this.page.locator(".owner-location-age")).toContainText("Дніпро");
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
