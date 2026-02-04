import { Page, Locator, expect } from "@playwright/test";
import { goToMyDogProfileFromSidebar } from "./Sidebar";
export class OwnerAccount {
  private readonly page: Page;

  userName: Locator;
  saveButton: Locator;
  ownerAccount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userName = page.locator("#username");
    this.saveButton = page.getByRole("button", { name: "Зберегти" });
    this.ownerAccount = page.getByRole("link", { name: "Мій обліковий запис" });
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
}
