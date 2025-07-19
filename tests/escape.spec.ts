import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41041

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`escape (${obstacleId})`, async ({ page }) => {
  await page.locator("input#resulttext").fill("{Click}")
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})