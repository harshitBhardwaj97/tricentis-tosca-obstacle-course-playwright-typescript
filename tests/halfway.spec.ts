import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 41038

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`halfway (${obstacleId})`, async ({ page }) => {
  const button = page.locator("button#halfButton")
  const box = await button.boundingBox()
  if (box == null) throw new Error()

  console.log("box:", box)
  const x = box.x + box.width * 0.75 // 75% width -> right half
  const y = box.y + box.height / 2   // vertical center

  console.log("clicking at:", x, y)
  await page.mouse.click(x, y)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})