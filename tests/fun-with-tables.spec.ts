import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 92248

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`fun with tables (${obstacleId})`, async ({ page }) => {
  /*
  const targetXpath = "//table[@id='persons']//td[3][.='john@example.com']//preceding::td[1][.='Doe']//parent::tr//button[.='Edit']"
  const targetLocator = page.locator(targetXpath)
  */
  const targetLocator = page.locator("//tr[td[1] = 'John' and td[2] = 'Doe']//div/button[.='Edit']")
  await targetLocator.click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})