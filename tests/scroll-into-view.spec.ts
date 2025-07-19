import { Constants } from "../constants/constants"
import { expect, test } from "@playwright/test"

const obstacleId = 99999

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`scroll into view (${obstacleId})`, async ({ page }) => {
  const iframeLocator = page.frameLocator("iframe#container")
  const inputField = iframeLocator.locator("input#textfield")

  const iframeElementHandle = await page.locator("iframe#container").elementHandle()
  if (!iframeElementHandle) throw new Error("iframe not found")

  const frame = await iframeElementHandle.contentFrame()
  if (!frame) throw new Error("unable to get iframe content frame")

  await frame.evaluate(() => {
    const scrollContainer = document.scrollingElement || document.documentElement || document.body
    scrollContainer.scrollTop = 10000 // large value to ensure bottom
  })

  await inputField.waitFor({ state: "visible" })
  await inputField.fill("Tosca")

  const submitButton = page.locator("a#submit")
  await submitButton.scrollIntoViewIfNeeded()
  await submitButton.click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})