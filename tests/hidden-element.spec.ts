import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 66666

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`hidden element (${obstacleId})`, async ({ page }) => {
  await page.locator("span#clickthis").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})