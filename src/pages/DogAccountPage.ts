import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DogAccountPage extends BasePage {
  readonly dogName: Locator = this.page.locator("#petName");
  readonly saveButton: Locator = this.page.getByRole("button", {
    name: "Зберегти",
  });

  async getDogName(): Promise<string> {
    const name = await this.dogName.inputValue();
    return name.trim();
  }

  async changeDogName(newDogName: string): Promise<void> {
    await this.dogName.fill(newDogName);
    await this.saveButton.click();
  }
}
