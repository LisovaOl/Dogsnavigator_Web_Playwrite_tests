import { test, expect } from "../../fixtures/auth.fixture";
import {
  goToMyDogProfileFromSidebar,
  goToProfile,
} from "../../../src/pages/Sidebar";
import { OwnerAccountPage } from "../../../src/pages/OwnerAccountPage";
import { makeNewString } from "../../../src/helpers/helpers";

test.describe("Owner Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-014 Change Owner Name", async ({ page }) => {
    await goToProfile(page);
    const editOwnerName = new OwnerAccountPage(page);

    await editOwnerName.goToOwnerAccount();

    // Зберігаємо оригінальне імя
    const originalOwnerName = await editOwnerName.getOwnerName();

    // Генеруємо нове імя
    const newOwnerName = await makeNewString(originalOwnerName);
    await editOwnerName.changeOwnerName(newOwnerName);
    await expect(editOwnerName.ownerName).toHaveValue(newOwnerName);

    // Перевіряємо чи нове імя відображається в профілі
    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".owner-name")).toHaveText(newOwnerName);

    // Повертаємо оригінальне імя
    await goToProfile(page);
    await editOwnerName.goToOwnerAccount();
    await editOwnerName.changeOwnerName(originalOwnerName);

    // Перевіряємо чи відображається оригінальне імя в профілі
    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".owner-name")).toHaveText(originalOwnerName);
    console.log("Returned name on the Profile: ", originalOwnerName);
  });

  test("DN-015 Change owner city", async ({ page }) => {
    await goToProfile(page);
    const editOwnerCity = new OwnerAccountPage(page);

    await editOwnerCity.goToOwnerAccount();
    await editOwnerCity.setNewCity();
    await goToProfile(page);
    await editOwnerCity.goToOwnerAccount();
    await editOwnerCity.setOldCity();
  });
});
