import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 22505

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`ids are not everything (${obstacleId})`, async ({ page }) => {
  await page.locator("//a[.='Click me!']").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})