import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 70924

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`errors occur (${obstacleId})`, async ({ page }) => {
  const countButton = page.locator("//button[@id='tech']//preceding-sibling::button")
  const callTechnicianButton = page.locator("button#tech")
  let count = "0"

  await countButton.click()

  while ("10" != count) {
    if ("ERROR" == await countButton.textContent()) {
      await callTechnicianButton.click()
      // console.log(`error found`)
      await page.waitForTimeout(200)
    }

    await countButton.click()
    // console.log(`current count: ${await countButton.textContent()}`)

    // @ts-ignore
    count = await countButton.textContent()
  }
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})