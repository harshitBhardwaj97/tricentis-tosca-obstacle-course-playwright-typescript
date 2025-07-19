import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 64161

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`not a table (${obstacleId})`, async ({ page }) => {
  await page.locator(`//a[normalize-space(text())="Generate order ID"]`).click()
  const orderId = await page.locator("//div[.='order id']//following::div[1]").textContent()
  if (!orderId) throw new Error("order id is missing")
  
  await page.locator("input#offerId").fill(orderId)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})