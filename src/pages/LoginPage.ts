import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly phoneInput: Locator = this.page.locator("#phone");
  private readonly passwordInput: Locator = this.page.locator("#password");
  private readonly submitButton: Locator = this.page.getByRole("button", {
    name: "Увійти",
  });

  // Open login page
  async open(): Promise<void> {
    await this.page.goto("/");
  }

  // Perform login
  async login(phone: string, password: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
