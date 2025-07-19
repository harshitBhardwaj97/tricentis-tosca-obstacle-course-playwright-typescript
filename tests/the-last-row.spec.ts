import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 70310

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`the last row (${obstacleId})`, async ({ page }) => {
  const lastRowText = await page.locator("(//table[@id='orderTable']//tr//td)[last()]").textContent()
  await page.locator("input#ordervalue").fill(`${lastRowText}`)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})