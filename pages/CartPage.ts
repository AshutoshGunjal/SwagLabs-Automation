import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
  }

  async verifyItemsCount(count: number) {
    expect(await this.cartItems.count()).toBe(count);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async calculateTotalPrice() {
    const prices = await this.cartItems
      .locator(".inventory_item_price")
      .allInnerTexts();
    const totalPrice = prices.reduce((sum, price) => {
      return sum + parseFloat(price.replace("$", ""));
    }, 0);
    return totalPrice;
  }

  async verifyTotalPriceWithinBudget(budget: number) {
    // Verify that the total price is within the budget
    const totalPrice = await this.calculateTotalPrice();
    expect(totalPrice).toBeLessThanOrEqual(budget);
  }
}
