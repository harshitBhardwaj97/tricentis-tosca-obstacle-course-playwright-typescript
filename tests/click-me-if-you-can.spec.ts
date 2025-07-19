import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41040

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`click me if you can (${obstacleId})`, async ({ page }) => {
  const element = await page.locator("input#buttontoclick").elementHandle()

  // @ts-ignore
  await page.evaluate(el => el.click(), element)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})