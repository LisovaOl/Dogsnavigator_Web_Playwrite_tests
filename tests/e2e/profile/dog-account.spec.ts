import { test, expect } from "../../fixtures/auth.fixture";
import { DogAccountPage } from "../../../src/pages/DogAccountPage";
import {
  makeNewString,
  selectFromSearchDropdown,
} from "../../../src/helpers/helpers";
import { Sidebar } from "../../../src/pages/Sidebar";

test.describe("Dog Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-012 Change Dog Name", async ({ page }) => {
    const goToMyDogProfile = new Sidebar(page);
    const goToProfile = new Sidebar(page);
    await goToProfile.goToProfile();
    const editDogName = new DogAccountPage(page);

    // зберігаємо оригінальне імя
    const originalDogName = await editDogName.getDogName();

    // Генеруємо нове імя
    const newDogName = await makeNewString(originalDogName);

    // змінюємо оригінальне імя на нове
    await editDogName.changeDogName(newDogName);
    await expect(editDogName.dogName).toHaveValue(newDogName);

    // Перевіряємо чи нове імя відображається в Профілі
    await goToMyDogProfile.goToMyDogProfile();
    await expect(page.locator(".pet-name")).toHaveText(newDogName);

    // Повертаємо оригінальне імя
    await goToProfile.goToProfile();
    await editDogName.changeDogName(originalDogName);

    // Перевіряємо чи відображається оригінальне імя в профілі
    await goToMyDogProfile.goToMyDogProfile();
    await expect(page.locator(".pet-name")).toHaveText(originalDogName);
    console.log("Returned name on the Profile: ", originalDogName);
  });

  test("DN-013 Change dog breed", async ({ page }) => {
    const goToProfile = new Sidebar(page);
    const goToMyDogProfile = new Sidebar(page);

    // Зміна породи
    await goToProfile.goToProfile();
    const selectedBreed = await selectFromSearchDropdown(
      page,
      page.locator("#petBreed label"),
      "пуд",
      "Пудель",
    );

    await page
      .getByRole("button", {
        name: "Зберегти",
      })
      .click();
    await goToMyDogProfile.goToMyDogProfile();

    await expect(page.locator(".pet-breed")).toContainText(selectedBreed);

    // Зміна породи назад
    await goToProfile.goToProfile();
    const selectedBreed2 = await selectFromSearchDropdown(
      page,
      page.locator("#petBreed label"),
      "ямт",
      "Ямтхунд",
    );

    await page
      .getByRole("button", {
        name: "Зберегти",
      })
      .click();
    await goToMyDogProfile.goToMyDogProfile();

    await expect(page.locator(".pet-breed")).toContainText(selectedBreed2);
  });
});
