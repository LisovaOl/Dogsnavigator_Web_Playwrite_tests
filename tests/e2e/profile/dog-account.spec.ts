import { test, expect } from "../../fixtures/auth.fixture";
import { DogAccountPage } from "../../../src/pages/DogAccountPage";
import {
  makeNewString,
  selectFromSearchDropdown,
} from "../../../src/helpers/helpers";
import { Sidebar } from "../../../src/pages/Sidebar";

test.describe("Dog Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-012 Change Dog Name", async ({ page }) => {
    const sidebar = new Sidebar(page);
    const editDogName = new DogAccountPage(page);

    let originalDogName: string;
    let newDogName: string;

    await test.step("Open Profile and get original dog name", async () => {
      await sidebar.goToProfile();
      originalDogName = await editDogName.getDogName();
    });

    await test.step("Generate new dog name and update it", async () => {
      newDogName = await makeNewString(originalDogName);

      await editDogName.changeDogName(newDogName);
      await expect(editDogName.dogName).toHaveValue(newDogName);
    });

    await test.step("Verify updated dog name is shown in My Dog Profile", async () => {
      await sidebar.goToMyDogProfile();
      await expect(page.locator(".pet-name")).toHaveText(newDogName);
    });

    await test.step("Restore original dog name", async () => {
      await sidebar.goToProfile();
      await editDogName.changeDogName(originalDogName);
    });

    await test.step("Verify original dog name is restored in My Dog Profile", async () => {
      await sidebar.goToMyDogProfile();
      await expect(page.locator(".pet-name")).toHaveText(originalDogName);
      console.log("Returned name on the Profile:", originalDogName);
    });
  });

  test("DN-013 Change dog breed", async ({ page }) => {
    const sidebar = new Sidebar(page);
    const saveButton = page.getByRole("button", { name: "Зберегти" });

    let selectedBreed1: string;
    let selectedBreed2: string;

    await test.step("Change breed to Пудель and verify in My Dog Profile", async () => {
      await sidebar.goToProfile();

      selectedBreed1 = await selectFromSearchDropdown(
        page,
        page.locator("#petBreed label"),
        "пуд",
        "Пудель",
      );

      await saveButton.click();

      await sidebar.goToMyDogProfile();
      await expect(page.locator(".pet-breed")).toContainText(selectedBreed1);
    });

    await test.step("Change breed back to Ямтхунд and verify in My Dog Profile", async () => {
      await sidebar.goToProfile();

      selectedBreed2 = await selectFromSearchDropdown(
        page,
        page.locator("#petBreed label"),
        "ямт",
        "Ямтхунд",
      );

      await saveButton.click();

      await sidebar.goToMyDogProfile();
      await expect(page.locator(".pet-breed")).toContainText(selectedBreed2);

      console.log("Returned breed on the Profile:", selectedBreed2);
    });
  });
});
