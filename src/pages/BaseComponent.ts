import { Locator } from "@playwright/test";

export class BaseComponent {
  constructor(protected readonly root: Locator) {}
}
