import { test, expect } from "../../fixtures/auth.fixture";
import { goToMyDogProfileFromSidebar, goToProfile } from "../../pages/Sidebar";
import { DogAccount } from "../../pages/DogAccount";

test.describe("Dog Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-012 Change Dog Name", async ({ page }) => {
    await goToProfile(page);
    const editDogName = new DogAccount(page);

    const name = await editDogName.getDogName();
    console.log("Original name: ", name);

    const currentName = await editDogName.getDogName();
    console.log("Current name: ", currentName);

    const newName = editDogName.makeDifferentName(currentName);
    //console.log("New name: ", newName);

    await editDogName.changeDogName(newName);
    //console.log("Current name: ", currentName);
    console.log("New name changed: ", newName);
    //console.log("Old name: ", newName);

    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".pet-name")).toHaveText(newName);
    console.log("New name on the sidebar: ", newName);

    // return old dog name
    await goToProfile(page);
    await editDogName.changeDogName(name);
    console.log("Old name: ", name);

    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".pet-name")).toHaveText(name);
    console.log("Returned name: ", name);
  });

  //     test("DN-013 Change dog breed", async ({ page }) => {});
});
