import { test, expect } from "../../fixtures/auth.fixture";
import { goToMyDogProfileFromSidebar, goToProfile } from "../../pages/Sidebar";
import { OwnerAccount } from "../../pages/OwnerAccount";

test.describe("Owner Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-014 Change Owner Name", async ({ page }) => {
    await goToProfile(page);
    const editOwnerName = new OwnerAccount(page);

    await editOwnerName.goToOwnerAccount();

    const originalOwnerName = await editOwnerName.getOwnerName();
    console.log("Original name: ", originalOwnerName);

    const currentName = await editOwnerName.getOwnerName();
    console.log("Current name: ", currentName);

    const newName = editOwnerName.makeDifferentName(currentName);
    //console.log("New name: ", newName);

    await editOwnerName.changeOwnerName(newName);
    //console.log("Current name: ", currentName);
    console.log("New name changed: ", newName);
    //console.log("Old name: ", newName);

    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".owner-name")).toHaveText(newName);
    console.log("New name on the sidebar: ", newName);

    // return old dog name
    await goToProfile(page);
    await editOwnerName.goToOwnerAccount();

    await editOwnerName.changeOwnerName(originalOwnerName);
    console.log("Old name: ", originalOwnerName);

    await goToMyDogProfileFromSidebar(page);
    await expect(page.locator(".owner-name")).toHaveText(originalOwnerName);
    console.log("Returned name: ", originalOwnerName);
  });

  test("DN-015 Change owner city", async ({ page }) => {
    await goToProfile(page);
    const editOwnerCity = new OwnerAccount(page);

    await editOwnerCity.goToOwnerAccount();
    await editOwnerCity.setNewCity(page);
    await goToProfile(page);
    await editOwnerCity.goToOwnerAccount();
    await editOwnerCity.setOldCity(page);
  });
});
