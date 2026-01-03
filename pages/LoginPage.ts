import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly phoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.phoneInput = page.locator("#phone");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator('button[type="submit"]');
  }

  // Open login page
  async open(): Promise<void> {
    await this.page.goto("/login");
    await expect(this.phoneInput).toBeVisible();
  }

  // Perform login
  async login(phone: string, password: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
