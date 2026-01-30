import { test, expect } from "../../fixtures/auth.fixture";

test.describe("Log In tests", { tag: "@ui" }, () => {
  test("DN-001 Should have title and button visibility", async ({ page }) => {
    // close Instagram popup
    //await page.locator(".close-icon").click();
    const close = page.locator(".close-icon").first();
    if (await close.isVisible({ timeout: 5000 }).catch(() => false)) {
      await close.click();
    }

    const recommendedDogsButton = page.getByRole("button", {
      name: "Рекомендовані",
    });
    const favoriteDogsButton = page.getByRole("button", {
      name: "Обрані Собаки",
    });
    const myPostsButton = page.getByRole("button", { name: "Мої пости" });
    const addPostButton = page.getByRole("button", { name: " Додати Пост " });
    const dogsNearSlider = page
      .getByRole("paragraph")
      .filter({ hasText: "Собаки поруч з вами" });
    const myProfileLink = page.getByRole("link", {
      name: "Мій Профіль",
      exact: true,
    });

    //await expect(page).toHaveURL("");
    await expect(page.locator("h1")).toHaveText("Пости");

    //await page.screenshot({ path: "with-auth-posts-page.png" });
    await expect(recommendedDogsButton).toBeVisible();
    await expect(favoriteDogsButton).toBeVisible();
    await expect(myPostsButton).toBeVisible();
    await expect(addPostButton).toBeVisible();
    await expect(dogsNearSlider).toBeVisible();
    await expect(myProfileLink).toBeVisible();
  });

  // Sidebar
  test("DN-002 Check side bar elements", async ({ page }) => {
    // close Instagram popup
    //await page.locator(".close-icon").click();
    const close = page.locator(".close-icon").first();
    if (await close.isVisible({ timeout: 5000 }).catch(() => false)) {
      await close.click();
    }

    const sideBar = page.locator("#menu-bar");

    const postsLink = sideBar.getByRole("link", { name: "Пости" });
    const profileDogLink = sideBar.getByRole("link", {
      name: "Профіль Собаки",
    });
    const dogsNearLink = sideBar.getByRole("link", { name: "Сусіди" });
    const lostDogsLink = sideBar.getByRole("link", {
      name: "Загублені Собаки",
    });
    const needHomeLink = sideBar.getByRole("link", { name: "Потрібен Дім" });
    const myMessagesLink = sideBar.getByRole("link", {
      name: "Мої Повідомлення",
    });
    const chatBreedLink = sideBar.getByRole("link", { name: "Чат Породи" });

    await expect(postsLink).toHaveClass(/active/);
    await expect(profileDogLink).toBeVisible();
    await expect(dogsNearLink).toBeVisible();
    await expect(lostDogsLink).toBeVisible();
    await expect(needHomeLink).toBeVisible();
    await expect(myMessagesLink).toBeVisible();
    await expect(chatBreedLink).toBeVisible();
  });
});
