import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  //private readonly page: Page; - можна прибрати це бо він є в базовому класі

  // Locators
  private readonly phoneInput: Locator = this.page.locator("#phone");
  private readonly passwordInput: Locator = this.page.locator("#password");
  private readonly submitButton: Locator = this.page.getByRole("button", {
    name: "Увійти",
  });
  // getByText: Locator = this.page.getByRole("button", {
  //   name: " Рекомендовані ",
  // });

  // constructor(page: Page) { - конструктор тепер не потрібен, бо локатори перенесли у властивості
  //   this.page = page;

  //   this.phoneInput = page.locator("#phone");
  //   this.passwordInput = page.locator("#password");
  //   this.submitButton = page.getByRole("button", { name: "Увійти" });
  //   this.getByText = page.getByRole("button", { name: " Рекомендовані " });
  // }

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
