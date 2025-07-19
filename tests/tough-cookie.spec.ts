import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 45618

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`tough cookie (${obstacleId})`, async ({ page }) => {
  await page.locator("input#generated").click()
  const text = await page.locator("input#generated").inputValue()
  console.log(text)

  // @ts-ignore
  const numbers = text.match(/\d+/g)

  console.log(numbers)

  if (numbers == null || numbers.length === 0) {
    throw new Error("numbers array is null or empty")
  }

  await page.locator("input#firstNumber").fill(numbers[0])
  await page.locator("input#secondNumber").fill(numbers[1])
  await page.locator("input#thirdNumber").fill(numbers[2])
  await page.keyboard.press("Enter")
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})