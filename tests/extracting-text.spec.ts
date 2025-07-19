import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 81012

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`extracting text (${obstacleId})`, async ({ page }) => {
  const alertLocator = page.locator("div#alerttext")

  const alertText = await alertLocator.innerText()
  console.log(alertText)

  const regex = /\$(\d+(?:\.\d{2})?)/
  const match = alertText.match(regex)

  if (!match) {
    throw new Error("amount not found in alert text")
  }

  const amountToEnter = match[1]
  await page.locator("input#totalamountText").fill(amountToEnter)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})