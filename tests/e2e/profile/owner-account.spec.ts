import { test, expect } from "../../fixtures/auth.fixture";
import { OwnerAccountPage } from "../../../src/pages/OwnerAccountPage";
import {
  makeNewString,
  selectFromSearchDropdown,
} from "../../../src/helpers/helpers";
import { Sidebar } from "../../../src/pages/Sidebar";

test.describe("Owner Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-014 Change Owner Name", async ({ page }) => {
    const sidebar = new Sidebar(page);
    const editOwnerName = new OwnerAccountPage(page);

    let originalOwnerName: string;
    let newOwnerName: string;

    await test.step("Open Owner Account and get original owner name", async () => {
      await sidebar.goToProfile();
      await editOwnerName.goToOwnerAccount();
      originalOwnerName = await editOwnerName.getOwnerName();
    });

    await test.step("Generate new owner name and update it", async () => {
      newOwnerName = await makeNewString(originalOwnerName);

      await editOwnerName.changeOwnerName(newOwnerName);
      await expect(editOwnerName.ownerName).toHaveValue(newOwnerName);
    });

    await test.step("Verify updated owner name is shown in My Dog Profile", async () => {
      await sidebar.goToMyDogProfile();
      await expect(page.locator(".owner-name")).toHaveText(newOwnerName);
    });

    await test.step("Restore original owner name", async () => {
      await sidebar.goToProfile();
      await editOwnerName.goToOwnerAccount();
      await editOwnerName.changeOwnerName(originalOwnerName);
    });

    await test.step("Verify original owner name is restored in My Dog Profile", async () => {
      await sidebar.goToMyDogProfile();
      await expect(page.locator(".owner-name")).toHaveText(originalOwnerName);
      console.log("Returned name on the Profile:", originalOwnerName);
    });
  });

  test("DN-015 Change owner city", async ({ page }) => {
    const sidebar = new Sidebar(page);
    const ownerAccount = new OwnerAccountPage(page);
    const saveButton = page.getByRole("button", { name: "Зберегти" });
    const cityField = page.getByPlaceholder("Місто");
    const ownerLocation = page.locator(".owner-location-age");

    let selectedNewCity: string;
    let selectedOriginalCity: string;

    await test.step("Change city to Дніпро and verify in My Dog Profile", async () => {
      await sidebar.goToProfile();
      await ownerAccount.goToOwnerAccount();

      selectedNewCity = await selectFromSearchDropdown(
        page,
        cityField,
        "дні",
        "Дніпро",
      );

      await saveButton.click();

      await sidebar.goToMyDogProfile();
      await expect(ownerLocation).toContainText(selectedNewCity);
    });

    await test.step("Change city back to Біла Церква and verify in My Dog Profile", async () => {
      await sidebar.goToProfile();
      await ownerAccount.goToOwnerAccount();

      selectedOriginalCity = await selectFromSearchDropdown(
        page,
        cityField,
        "біла",
        "Біла Церква",
      );

      await saveButton.click();

      await sidebar.goToMyDogProfile();
      await expect(ownerLocation).toContainText(selectedOriginalCity);

      console.log("Returned city on the Profile:", selectedOriginalCity);
    });
  });
});
