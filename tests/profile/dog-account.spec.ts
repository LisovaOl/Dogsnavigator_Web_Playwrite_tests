import { test, expect } from "../../fixtures/auth.fixture";
import { goToProfile } from "../../pages/Sidebar";
import { DogAccount } from "../../pages/DogAccount";

test.describe("Dog Account", { tag: ["@functional", "@ui"] }, () => {
  test("DN-012 Change Dog Name", async ({ page }) => {
    await goToProfile(page);
    const editDogName = new DogAccount(page);

    const currentName = await editDogName.getDogName();
    console.log(currentName);

    const newName = editDogName.makeDifferentName(currentName);
    console.log(newName);

    await editDogName.changeDogName(newName);

    // return old dog name
    await editDogName.changeDogName(currentName);
    console.log(currentName);
  });
  //     test("DN-013 Change dog breed", async ({ page }) => {});
});
