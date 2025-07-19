import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 66667

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`empty (${obstacleId})`, async ({ page }) => {
  await page.locator("button#generate").click()
  const checkpointLocator = page.locator("div#checkpoints .checkpoint")
  const count = await checkpointLocator.count()

  for (let i = 0; i < count; i++) {
    await checkpointLocator.nth(i).click()
  }
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})