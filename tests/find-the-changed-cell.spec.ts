declare global {
  interface Window {
    elementRow: number;
    elementCol: number;
    elementOriginal: string;
    elementChanged: string;
    origHeaderValue: string;
  }
}

import { test } from "../base/base"
import { expect } from "@playwright/test"
import { Constants } from "../constants/constants"

const obstacleId = 73591

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`find the changed cell (${obstacleId})`, async ({ page }) => {
  await page.locator("a#change").click()

  const { elementRow, elementCol, elementOriginal, elementChanged } = await page.evaluate(() => {
    return {
      elementRow: window.elementRow,
      elementCol: window.elementCol,
      elementOriginal: window.elementOriginal,
      elementChanged: window.elementChanged,
    }
  })

  console.log(`row: ${elementRow}, col: ${elementCol}, original: ${elementOriginal}, changed: ${elementChanged}`)
  await page.locator("input#rowNumber").fill(String(elementRow))
  await page.locator("input#columnNumber").fill(String(elementCol))
  await page.locator("input#originalValue").fill(elementOriginal)
  await page.locator("input#changedValue").fill(elementChanged)

  await page.evaluate(({ row, col }) => {
    const cell = document.getElementById(`${row}_${col}`)
    if (cell) {
      cell.scrollIntoView({ behavior: "smooth", block: "center" })
      cell.style.backgroundColor = "yellow"
    }
  }, { row: elementRow, col: elementCol })

  // @ts-ignore
  await page.evaluate(() => check())
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})