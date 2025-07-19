import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 94441

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`testing methods (${obstacleId})`, async ({ page }) => {
  const select = page.locator("select#multiselect")
  const partialLabels = ["functional", "end2end", "gui", "exploratory"]

  const matchingValues = await select.evaluate((el, partials) => {
    const selectEl = el as HTMLSelectElement
    const selectedValues: string[] = []

    for (const option of Array.from(selectEl.options)) {
      if (partials.some(p => option.text.toLowerCase().includes(p))) {
        selectedValues.push(option.value)
      }
    }
    return selectedValues
  }, partialLabels)

  await select.selectOption(matchingValues)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})