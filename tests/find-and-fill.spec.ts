import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 73590

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`find and fill (${obstacleId})`, async ({ page }) => {
  const password = "ABC"
  await page.locator("input#pass").fill(password)

  const hiddenPasswordInput = page.locator("input#actual")
  await page.evaluate((element) => {
    // @ts-ignore
    element.style.display = "block"
  }, await hiddenPasswordInput.elementHandle())

  // fill password into hidden input field
  await hiddenPasswordInput.fill(password)
  await page.locator("//a[.=' Click Me']").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})