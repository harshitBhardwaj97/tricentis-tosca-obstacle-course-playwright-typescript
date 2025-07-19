import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41037

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`meeting scheduler (${obstacleId})`, async ({ page }) => {
  const result = await page.locator("//table//td[.='11:00 - 13:00']/parent::tr/td[5]").textContent()
  if (result == null) throw new Error()
  
  await page.locator("input#resulttext").fill(result)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})