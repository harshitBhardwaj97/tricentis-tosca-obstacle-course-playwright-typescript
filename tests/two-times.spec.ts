import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 72954

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`two times (${obstacleId})`, async ({ page }) => {
  /*
  await page.locator("//a[contains(@id, 'rnd')]").click()
  await page.locator("//a[contains(@id, 'rnd')]").click()
  */
  await page.locator("//a[contains(@id, 'rnd')]").dblclick()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})