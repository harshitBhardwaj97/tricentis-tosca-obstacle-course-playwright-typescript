import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41036

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`table search (${obstacleId})`, async ({ page }) => {
  /*
  // ---------- using evaluate ---------- //
  */
  const found = await page.evaluate(() => {
    return [...document.querySelectorAll("table#randomTable td")]
      .some(td => td.textContent?.trim() === "15")
  })
  await page.locator("input#resulttext").fill(found ? "True" : "False")
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()

  /*
  // ---------- using loop ---------- //
  const cells = page.locator("table#randomTable td")
  const count = await cells.count()
  let found = false

  for (let i = 0; i < count; i++) {
    if ("15" == await cells.nth(i).textContent()) {
      found = true
      break
    }
  }

  const result = found ? "True" : "False"
  await page.locator("input#resulttext").fill(result)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
  */

  /*
  // ---------- using locator.filter() ---------- //
  const cell = page.locator("table#randomTable td").filter({ hasText: "15" })
  const found = await cell.count() > 0
  const result = found ? "True" : "False"
  await page.locator("input#resulttext").fill(result)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
  */
})