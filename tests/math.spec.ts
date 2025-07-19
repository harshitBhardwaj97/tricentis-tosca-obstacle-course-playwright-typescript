import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 32403

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`math (${obstacleId})`, async ({ page }) => {
  const numberOne = parseInt(await page.locator("label#no1").innerText())
  const numberTwo = parseInt(await page.locator("label#no2").innerText())
  const symbol = await page.locator("label#symbol1").innerText()

  let result: number
  switch (symbol) {
    case "+":
      result = numberOne + numberTwo
      break
    case "-":
      result = numberOne - numberTwo
      break
    case "*":
      result = numberOne * numberTwo
      break
    case "/":
      result = Math.floor(numberOne / numberTwo)
      break
    case "%":
      result = numberOne % numberTwo
      break
    default:
      throw new Error(`Unsupported symbol: ${symbol}`)
  }

  await page.locator("input#result").fill(result.toString())
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})