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
    // itemCount that retrieves the total number of inventory items
    const itemCount = await this.inventoryItems.count();
    // a Set to store unique ramdon indexes
    const randomIndexes = new Set<number>();

    // countinuously generates random indexes until the set contains the desired number of items ('count')
    while (randomIndexes.size < count) {
      // generate random index within the range of available items and
      // adds the index to the set
      // that is generates a random integer between 0 and 'itemCount - 1', ensuring that the random index is within the bounds of available inventory items.
      randomIndexes.add(Math.floor(Math.random() * itemCount));
    }
    // iterate over the unique random indexs
    for (const index of randomIndexes) {
      // 'nth' method selects the element at the specified index from the collection of elements matched by the locator.
      // in this context, it selects a specific inventory item based on the random index.
      const addItemButton = this.inventoryItems.nth(index).locator("button");
      await addItemButton.click();
    }
  }

  async selectItemsWithinBudget(budget: number) {
    // get all items from the inventory list
    const allItems = await this.inventoryItems.allInnerTexts();

    // Extract prices and sort items in ascending order
    const itemsWithPrices = allItems
      .map((item) => {
        const price = parseFloat(item.split("$")[1]);
        return { item, price };
      })
      .sort((a, b) => a.price - b.price);

    // select items within the budget
    let total = 0;
    for (const { item, price } of itemsWithPrices) {
      if (total + price <= budget) {
        const itemName = item
          .split("\n")[0]
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-");
        const addItemButton = this.page.locator(
          `xpath=//*[@id="add-to-cart-${itemName}"]`
        );
        await addItemButton.click();
        total += price;
      } else {
        break;
      }
    }
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
