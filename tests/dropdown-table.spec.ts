import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 14090

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`dropdown table (${obstacleId})`, async ({ page }) => {
  await page.locator("a#generate").click()
  
  const rows = await page.locator("table#comboboxTable tr:nth-child(n+2)").all()

  for (const row of rows) {
    const promptText = await row.locator("td.task").textContent()
    const firstLetter = promptText?.split(": ")[1]?.trim()?.[0] ?? ""

    const select = row.locator("select")
    const options = await select.locator("option").all()

    for (const option of options) {
      const optionText = await option.textContent()
      if (optionText?.startsWith(firstLetter)) {
        await select.selectOption({ label: optionText })
        break
      }
    }
  }

  await page.locator("a#submit").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})
