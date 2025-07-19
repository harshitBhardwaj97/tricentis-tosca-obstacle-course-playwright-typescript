import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 24499

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`and counting (${obstacleId})`, async ({ page }) => {
  const toBeTyped = await page.locator("span#typeThis").textContent()
  if (toBeTyped == null) throw new Error()

  await page.locator("//p[contains(.,'Type this: ')]//parent::div//following::div[1]//input").fill(toBeTyped)
  const result = await page.locator(".select2-results__option").count()

  await page.locator("input#entryCount").fill(`${result}`)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})