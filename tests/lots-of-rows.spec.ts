import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41032

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`lots of rows (${obstacleId})`, async ({ page }) => {
  const rowCount = await page.locator("#rowCountTable tr").count()
  await page.locator("input#rowcount").fill(`${rowCount}`)

  await page.locator("//a[.='Click Me']").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})