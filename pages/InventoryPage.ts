import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator(".inventory_item");
    this.cartButton = page.locator(".shopping_cart_link");
  }

  async addRandomItems(count: number) {
    const itemCount = await this.inventoryItems.count();
    const randomIndexes = new Set<number>();

    while (randomIndexes.size < count) {
      randomIndexes.add(Math.floor(Math.random() * itemCount));
    }

    for (const index of randomIndexes) {
      const addItemButton = this.inventoryItems.nth(index).locator("button");
      await addItemButton.click();
    }
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
