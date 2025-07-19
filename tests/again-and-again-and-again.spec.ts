import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 81121

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`again and again and again (${obstacleId})`, async ({ page }) => {
  const button = page.locator("a#button")
  let text = "Click Me"
  let i = 0

  while ("Enough" != text && i < 20) {
    await button.click()
    // @ts-ignore
    text = await button.textContent()
    i++
    console.log(text)
  }
  await button.click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})