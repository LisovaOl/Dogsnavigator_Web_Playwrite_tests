import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly phoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  getByText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.phoneInput = page.locator("#phone");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator('button[type="submit"]');
    this.getByText = page.getByRole("button", { name: " Рекомендовані " });
  }

  // Open login page
  async open(): Promise<void> {
    await this.page.goto("/login");
    await expect(this.phoneInput).toBeVisible();
  }

  // Perform login
  async login(phone: string, password: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.page.waitForTimeout(300);
    //await expect(this.phoneInput).toHaveValue(phone);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(300);
    // await expect(this.passwordInput).toHaveValue(password);
    await this.submitButton.click();

    // форма логіну має зникнути
    //await expect(this.submitButton).toBeHidden({ timeout: 60_000 });

    // Пости мають бути видимі
    //await expect(this.getByText).toBeVisible();
    // чекати, що зʼявилась кнопка/таб "Рекомендовані"
    // await this.page.getByRole("button", { name: "Рекомендовані" }).waitFor({
    //   state: "visible",
    //   timeout: 60_000,
    // });
    // await Promise.all([
    //   this.submitButton.click(),

    //   this.page.waitForLoadState("domcontentloaded"),
    // ]);

    // // ✅ чекати маркер успіху (вибери реальний елемент)
    // await this.page
    //   .locator("li.post, .create-post, nav.sidebar")
    //   .first()
    //   .waitFor({
    //     state: "visible",
    //     timeout: 60_000,
    //   });

    // // ❗ якщо все ще на login — явно падаємо з зрозумілим текстом
    // if (this.page.url().includes("/login")) {
    //   throw new Error(
    //     `Login did not complete. Still on login page: ${this.page.url()}`,
    //   );
    // }
  }
}
