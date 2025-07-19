import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 51130

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`popup windows (${obstacleId})`, async ({ page, context }) => {
  const [popup] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("a:text('Click Me')").click(),
  ])

  await popup.waitForLoadState("domcontentloaded")

  console.log("popup title:", await popup.title())
  console.log("popup url:", popup.url())

  await popup.close()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})