import { test, expect } from "../../fixtures/auth.fixture";
import { OwnerAccountPage } from "../../../src/pages/OwnerAccountPage";
import {
  makeNewString,
  selectFromSearchDropdown,
} from "../../../src/helpers/helpers";
import { Sidebar } from "../../../src/pages/Sidebar";

test.describe("Owner Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-014 Change Owner Name", async ({ page }) => {
    const goToMyDogProfile = new Sidebar(page);
    const goToProfile = new Sidebar(page);

    await goToProfile.goToProfile();
    const editOwnerName = new OwnerAccountPage(page);

    await editOwnerName.goToOwnerAccount();

    // Зберігаємо оригінальне імя
    const originalOwnerName = await editOwnerName.getOwnerName();

    // Генеруємо нове імя
    const newOwnerName = await makeNewString(originalOwnerName);
    await editOwnerName.changeOwnerName(newOwnerName);
    await expect(editOwnerName.ownerName).toHaveValue(newOwnerName);

    // Перевіряємо чи нове імя відображається в профілі
    await goToMyDogProfile.goToMyDogProfile();
    await expect(page.locator(".owner-name")).toHaveText(newOwnerName);

    // Повертаємо оригінальне імя
    await goToProfile.goToProfile();
    await editOwnerName.goToOwnerAccount();
    await editOwnerName.changeOwnerName(originalOwnerName);

    // Перевіряємо чи відображається оригінальне імя в профілі
    await goToMyDogProfile.goToMyDogProfile();
    await expect(page.locator(".owner-name")).toHaveText(originalOwnerName);
    console.log("Returned name on the Profile: ", originalOwnerName);
  });

  test("DN-015 Change owner city", async ({ page }) => {
    const goToMyDogProfile = new Sidebar(page);
    const goToProfile = new Sidebar(page);
    const ownerAccount = new OwnerAccountPage(page);

    // Зміна міста на нове
    await goToProfile.goToProfile();
    await ownerAccount.goToOwnerAccount();
    const selectedCity = await selectFromSearchDropdown(
      page,
      page.getByPlaceholder("Місто"),
      "дні",
      "Дніпро",
    );

    await page
      .getByRole("button", {
        name: "Зберегти",
      })
      .click();
    await goToMyDogProfile.goToMyDogProfile();

    await expect(page.locator(".owner-location-age")).toContainText(
      selectedCity,
    );

    // змінити місто назад
    await goToProfile.goToProfile();
    await ownerAccount.goToOwnerAccount();

    const selectedCity2 = await selectFromSearchDropdown(
      page,
      page.getByPlaceholder("Місто"),
      "біла",
      "Біла Церква",
    );

    await page
      .getByRole("button", {
        name: "Зберегти",
      })
      .click();
    await goToMyDogProfile.goToMyDogProfile();

    await expect(page.locator(".owner-location-age")).toContainText(
      selectedCity2,
    );
  });
});
