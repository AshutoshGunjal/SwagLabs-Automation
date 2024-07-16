import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("Complete Checkout Flow on Swag Labs", async ({ page }) => {
  // instances of the page objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Navigate to the base URL
  await page.goto("/");

  // Login
  await loginPage.login("standard_user", "secret_sauce");

  // Add 3 random items to the cart
  await inventoryPage.addRandomItems(3);

  // Go to the cart
  await inventoryPage.goToCart();

  // Verify 3 items in the cart
  await cartPage.verifyItemsCount(3);

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  // Fill in checkout information
  await checkoutPage.fillCheckoutInformation("John", "Doe", "12345");

  // Finish checkout
  await checkoutPage.finishCheckout();

  // Verify checkout completion
  await checkoutPage.verifyCheckoutCompletion();

  await page.screenshot({ path: "checkout_complete.png" });
});
