import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 57683

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})


test(`confusing dates (${obstacleId})`, async ({ page }) => {
  await page.locator("button#generate").click()
  const rawDate = await page.locator("input#dateGenerated").inputValue()
  console.log("generated date:", rawDate)

  const [monthStr, dayStr, yearStr] = rawDate.split("/")
  const month = parseInt(monthStr)
  const day = parseInt(dayStr)
  const year = parseInt(yearStr)

  const date = new Date(year, month - 1, day)
  date.setDate(1)
  date.setMonth(date.getMonth() + 2)

  console.log(`updated date: ${date.toDateString()}`)

  const isoDate = date.toLocaleDateString("en-CA")
  console.log("calculated iso date:", isoDate)

  await page.locator("input#dateSolution").fill(isoDate)
  await page.locator("button#done").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})