import { test, expect } from "../../fixtures/auth.fixture";
import { goToProfile } from "../../pages/Sidebar";
import { DogAccount } from "../../pages/DogAccount";

test.describe("Dog Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-012 Change Dog Name", async ({ page }) => {
    await goToProfile(page);
    const editDogName = new DogAccount(page);

    const dogOldName = await editDogName.getDogName();
    //console.log("name: ", oldName);

    const currentName = await editDogName.getDogName();
    //console.log("Current name: ", currentName);

    const newName = editDogName.makeDifferentName(currentName);
    //console.log("New name: ", newName);

    await editDogName.changeDogName(newName);
    //console.log("Current name: ", currentName);
    //console.log("New name: ", newName);
    //console.log("Old name: ", newName);
    // close Instagram popup
    //await page.locator(".close-icon").click();
    const close = page.locator(".close-icon").first();
    if (await close.isVisible().catch(() => false)) {
      await close.click();
    }

    // return old dog name
    await editDogName.changeDogName(dogOldName);
    console.log("Old name: ", dogOldName);

    // close Instagram popup
    //await page.locator(".close-icon").click();
    if (await close.isVisible().catch(() => false)) {
      await close.click();
    }
  });
  //     test("DN-013 Change dog breed", async ({ page }) => {});
});
