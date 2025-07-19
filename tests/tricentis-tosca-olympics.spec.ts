import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 82018

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`tricentis tosca olympics (${obstacleId})`, async ({ page }) => {
  test.setTimeout(Constants.MAX_TIMEOUT)
  await page.locator("a#start").click()
  const instructions = page.locator("//div[@id='text' and @class='instructions']")
  
  let isGameOver = false
  let instructionsText = ""

  while (!isGameOver) {
    // @ts-ignore
    instructionsText = await instructions.textContent()
    console.log(instructionsText)

    if (instructionsText.toLowerCase().includes("you did it") || instructionsText.toLowerCase().includes("crash")) {
      console.log(`game over`)
      isGameOver = true
    } else if (instructionsText.toLowerCase().includes("left")) {
      console.log(`moving left`)
      await page.keyboard.press("ArrowLeft")
    } else if (instructionsText.toLowerCase().includes("right")) {
      console.log(`moving right`)
      await page.keyboard.press("ArrowRight")
    }

  }
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})