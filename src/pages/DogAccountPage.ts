import { Locator, expect } from "@playwright/test";
import { goToMyDogProfileFromSidebar } from "./Sidebar";
import { BasePage } from "./BasePage";

export class DogAccountPage extends BasePage {
  readonly dogName: Locator = this.page.locator("#petName");
  readonly dogBreed: Locator = this.page.locator("#petBreed label");
  readonly saveButton: Locator = this.page.getByRole("button", {
    name: "Зберегти",
  });

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

  async setNewDogBreed(): Promise<void> {
    await this.dogBreed.fill("пуд");

    await this.page.getByText("Пудель", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(this.page);

    await expect(this.page.locator(".pet-breed")).toContainText("Пудель");
  }

  async setOldDogBreed(): Promise<void> {
    await this.dogBreed.fill("ямт");

    await this.page.getByText("Ямтхунд", { exact: true }).click();
    await this.saveButton.click();

    await goToMyDogProfileFromSidebar(this.page);

    await expect(this.page.locator(".pet-breed")).toContainText("Ямтхунд");
  }
}
// export class AutocompleteDropdown {
//   constructor(
//     private input: Locator, // combobox input
//     private listbox: Locator, // listbox container
//     private option: Locator, // option locators inside listbox
//   ) {}

//   async typeQuery(query: string) {
//     await this.input.fill(query);
//   }

//   async expectOptionsMatchQuery(
//     query: string,
//     mode: "startsWith" | "includes" = "includes",
//   ) {
//     // дочекатись, що список зʼявився/оновився
//     await expect(this.listbox).toBeVisible();

//     const texts = (await this.option.allTextContents())
//       .map((t) => t.trim())
//       .filter(Boolean);

//     // якщо варіантів немає — це або empty-state, або баг.
//     expect(texts.length).toBeGreaterThan(0);

//     const q = query.toLowerCase();
//     for (const t of texts) {
//       const v = t.toLowerCase();
//       if (mode === "startsWith") {
//         expect(v.startsWith(q)).toBeTruthy();
//       } else {
//         expect(v.includes(q)).toBeTruthy();
//       }
//     }
//   }

//   async expectEmptyState(emptyText = "No results") {
//     await expect(this.listbox).toBeVisible();
//     await expect(this.listbox).toContainText(emptyText);
//     await expect(this.option).toHaveCount(0);
//   }

//   async selectFirstOption() {
//     await expect(this.listbox).toBeVisible();
//     const first = this.option.first();
//     const value = (await first.textContent())?.trim() ?? "";
//     await first.click();
//     return value;
//   }

//   async expectSelectedValue(value: string) {
//     await expect(this.input).toHaveValue(value);
//   }
// }
