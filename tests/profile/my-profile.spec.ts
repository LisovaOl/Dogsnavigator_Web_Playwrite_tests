import { test, expect } from "../../fixtures/auth.fixture";
import { goToProfile } from "../../pages/Sidebar";
import { PostPopup } from "../../pages/PostPopup";

test.describe(
  "My Posts. View, Edit, Add comment",
  { tag: ["@functional", "@ui"] },
  () => {
    test("DN-012 Open Мій Профіль", async ({ page }) => {
      await goToProfile(page);
    });
    //     test("DN-013 Add / Delete comment in the My Post", async ({ page }) => {});
  }
);
