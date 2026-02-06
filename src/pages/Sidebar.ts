import { Page, expect } from "@playwright/test";

export async function goToMyDogProfileFromSidebar(page: Page) {
  await page.getByRole("link", { name: "Профіль Собаки" }).click();
  await expect(page.getByRole("heading", { name: "Мій собака" })).toBeVisible();
}
export async function goToProfile(page: Page) {
  await page.getByRole("link", { name: "Мій Профіль", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Мій Профіль" }),
  ).toBeVisible();
}

// export class Sidebar {
//   private readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   async goToMyDogProfile() {
//     await this.page.getByRole("link", { name: "Профіль Собаки" }).click();
//     // await expect(
//     //   this.page.getByRole("heading", { name: "Мій собака" }),
//     // ).toBeVisible();
//   }

//   async goToProfile() {
//     await this.page
//       .getByRole("link", { name: "Мій Профіль", exact: true })
//       .click();
//     // await expect(
//     //   this.page.getByRole("heading", { name: "Мій Профіль" }),
//     // ).toBeVisible();
//   }
// }
