import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 60469

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`toscabot can fly (${obstacleId})`, async ({ page }) => {
  /*
  await page.locator("img#toscabot").hover()
  await page.mouse.down()
  await page.locator("div#to").hover()
  await page.mouse.up()
  */
  await page.locator("img#toscabot").dragTo(page.locator("div#to"))
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})