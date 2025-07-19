import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 21269

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`future christmas (${obstacleId})`, async ({ page }) => {
  const currentYear = new Date().getFullYear()
  const targetYear = currentYear + 2
  const christmas = new Date(`${targetYear}-12-25`)

  const dayOfWeek = christmas.toLocaleDateString("en-US", {
    weekday: "long",
  })

  console.log(`day of christmas in ${targetYear} is: ${dayOfWeek}`)
  await page.locator("input#christmasday").fill(dayOfWeek)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})