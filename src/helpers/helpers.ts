import { Page, expect, Locator } from "@playwright/test";

export async function makeNewString(string: string) {
  const base = string.trim();
  const suffix = Date.now().toString().slice(-5);
  return `${base}-${suffix}`.slice(0, 9);
}

// export async function goToMyDogProfileFromSidebar(page: Page) {
//   await page.getByRole("link", { name: "Профіль Собаки" }).click();
//   await expect(page.getByRole("heading", { name: "Мій собака" })).toBeVisible();
// }

// export async function goToProfile(page: Page) {
//   await page.getByRole("link", { name: "Мій Профіль", exact: true }).click();
//   await expect(
//     page.getByRole("heading", { name: "Мій Профіль" }),
//   ).toBeVisible();
// }

export async function selectFromSearchDropdown(
  page: Page,
  input: Locator,
  searchText: string,
  expectedOption: string,
): Promise<string> {
  await input.fill(searchText);

  const option = page.getByText(expectedOption, { exact: true });

  await expect(option).toBeVisible();
  await option.click();

  return expectedOption;
}
