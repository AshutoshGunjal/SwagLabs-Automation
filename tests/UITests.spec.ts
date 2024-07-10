import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { webkit, chromium, firefox } from "@playwright/test";
import { title } from "process";

test("Complete Checkout Flow on Swag Labs", async () => {
  const browser: Browser = await chromium.launch({ channel: "chrome" });

  const page: Page = await browser.newPage();

  await page.goto("/");

  // Login
  const username: Locator = await page.locator("#user-name");
  const password: Locator = await page.locator("#password");
  const loginButton: Locator = await page.locator("#login-button");

  await username.fill("standard_user");
  await password.fill("secret_sauce");
  await loginButton.click();

  const pageTitle = await page.title();
  console.log("Home Page Title: ", title);

  await page.screenshot({ path: "homepage.png" });

  expect(pageTitle).toEqual("Swag Labs");

  // Add 3 random items to the cart
  const inventoryItems: Locator = page.locator(".inventory_item");
  const itemCount = await inventoryItems.count();
  const randomIndexes = new Set<number>();

  while (randomIndexes.size < 3) {
    randomIndexes.add(Math.floor(Math.random() * itemCount));
  }

  for (const index of randomIndexes) {
    const addItemButton = inventoryItems.nth(index).locator("button");
    await addItemButton.click();
  }

  // Go to cart
  const cartButton: Locator = page.locator(".shopping_cart_link");
  await cartButton.click();

  // Verify 3 items in the cart
  const cartItems: Locator = page.locator(".cart_item");
  expect(await cartItems.count()).toBe(3);

  // Proceed to Checkout
  const checkoutButton: Locator = page.locator("#checkout");
  await checkoutButton.click();

  // Fill in checkout information
  const firstName: Locator = await page.locator("#first-name");
  const lastName: Locator = await page.locator("#last-name");
  const postalCode: Locator = await page.locator("#postal-code");

  await firstName.fill("Ashu");
  await lastName.fill("Gunjal");
  await postalCode.fill("ABCDEF");

  const continueButton: Locator = page.locator("#continue");
  await continueButton.click();

  // Verify checkout overview and finish
  const summaryItems: Locator = page.locator(".summary_subtotal_label");
  // ensuring there's at least one item summary
  expect(await summaryItems.count()).toBeGreaterThan(0);

  const finishButton: Locator = page.locator("#finish");
  await finishButton.click();

  // Verify Checkout completion

  const completeMessage: Locator = await page.locator(".complete-header");
  expect(await completeMessage.textContent()).toEqual(
    "Thank you for your order!"
  );

  await page.screenshot({ path: "checkout-completed.png" });
  await browser.close();
});
