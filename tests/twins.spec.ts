import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 12952

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`twins (${obstacleId})`, async ({ page }) => {
  await page.locator("a[onclick='obstacleCompleted();']").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})