import { Page } from "@playwright/test";

export class BaseLocators {
  constructor(protected page: Page) {}
}
