import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("Select items within a specific budget", async ({ page }) => {
  // instances of the page objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Define budget
  const budget = 30.0;

  // Navigate to the base URL
  await page.goto("/");

  // Login
  await loginPage.login("standard_user", "secret_sauce");

  // Select items within the budget
  await inventoryPage.selectItemsWithinBudget(budget);

  // Go to the cart
  await inventoryPage.goToCart();

  // Verify that total price is within the budget
  await cartPage.verifyTotalPriceWithinBudget(budget);

  // capture screenshot of cart
  await page.screenshot({ path: "budget_cart.png" });
});
