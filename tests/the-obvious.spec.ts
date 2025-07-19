import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 73588

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`the obvious (${obstacleId})`, async ({ page }) => {
  await page.locator("a#clickme").click()
  const text = await page.locator("input#randomtext").inputValue()
  await page.locator("select#selectlink").selectOption(text)
  await page.locator("//a[.='Submit']").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})