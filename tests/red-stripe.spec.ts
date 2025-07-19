import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 30034

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`red stripe (${obstacleId})`, async ({ page }) => {
  await page.locator("//button[@id='generate']").click()
  await page.locator("//div[contains(@style,'height: 100%; width: 3px; background-color: red;')]").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})