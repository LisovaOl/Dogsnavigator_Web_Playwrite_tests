import { Page, Locator, expect } from "@playwright/test";
import { goToMyDogProfileFromSidebar } from "./Sidebar";
export class OwnerAccount {
  private readonly page: Page;

  userName: Locator;
  saveButton: Locator;
  ownerAccount: Locator;
  city: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userName = page.locator("#username");
    this.saveButton = page.getByRole("button", { name: "Зберегти" });
    this.ownerAccount = page.getByRole("link", { name: "Мій обліковий запис" });
    this.city = page.getByPlaceholder("Місто");
  }

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

  async setNewCity(page: Page) {
    await this.city.fill("дні");

    await page.getByText("Дніпро", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(page);

    await expect(page.locator(".owner-location-age")).toContainText("Дніпро");
  }

  async setOldCity(page: Page) {
    await this.city.fill("біла");

    await page.getByText("Біла Церква", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(page);

    const oldBreed = await expect(
      page.locator(".owner-location-age"),
    ).toContainText("Біла Церква");
  }
}
