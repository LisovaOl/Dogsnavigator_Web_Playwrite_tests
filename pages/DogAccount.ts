import { Page, Locator, expect } from "@playwright/test";

export class DogAccount {
  private readonly page: Page;

  dogName: Locator;
  dogBreed: Locator;
  // dogSex: Locator;
  // dogAgeYear: Locator;
  // dogAgeMonth: Locator;
  // aboutDogField: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dogName = page.locator("#petName");
    this.dogBreed = page.locator("#petBreed label");
    this.saveButton = page.getByRole("button", { name: "Зберегти" });
  }

  async getDogName(): Promise<string> {
    const oldName = await this.dogName.inputValue();
    return oldName.trim();
  }

  makeDifferentName(oldName: string): string {
    const base = oldName.trim();
    const suffix = Date.now().toString().slice(-6); // коротко
    // якщо є ліміт довжини — обрізай
    return `${base}-${suffix}`.slice(0, 9);
  }

  async changeDogName(newName: string): Promise<void> {
    //await this.dogName.click();
    await this.dogName.fill(newName);
    await this.saveButton.click();

    // чекати, що збереглось: або toast, або апдейт поля
    await expect(this.dogName).toHaveValue(newName, { timeout: 30_000 });
  }

  // додати перевірку зміну імені у профілі собаки на сайдбарі
}
