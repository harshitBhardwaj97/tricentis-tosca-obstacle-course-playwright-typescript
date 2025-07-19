import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 19875

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`fill tomorrow's date (${obstacleId})`, async ({ page }) => {
  const tomorrowFormatted = getTomorrowDateFormatted()
  await page.locator("input#datefield").fill(tomorrowFormatted)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})

function getTomorrowDateFormatted(): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)

  const day = String(tomorrow.getDate()).padStart(2, "0")
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
  const year = tomorrow.getFullYear()

  return `${day}.${month}.${year}`
}