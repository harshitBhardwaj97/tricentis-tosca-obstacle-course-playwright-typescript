import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 33678

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`wait a moment (${obstacleId})`, async ({ page }) => {
  await page.locator("#one").click()
  const sendButton = page.locator("//button[.='Send']")

  await expect(sendButton).toBeEnabled({ timeout: Constants.BIG_TIMEOUT })
  await sendButton.click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})