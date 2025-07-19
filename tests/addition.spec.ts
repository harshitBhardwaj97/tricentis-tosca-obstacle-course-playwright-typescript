import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 78264

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`addtion (${obstacleId})`, async ({ page }) => {
  const numOne = await page.locator("label#no1").textContent()
  const numTwo = await page.locator("label#no2").textContent()

  // @ts-ignore
  const sum = parseInt(numOne) + parseInt(numTwo)
  await page.locator("input#result").fill(`${sum}`)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})