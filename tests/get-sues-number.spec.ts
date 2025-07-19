import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"
import fs from "fs"
import { parseStringPromise } from "xml2js"

const obstacleId = 72946

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`get sues number (${obstacleId})`, async ({ page }) => {
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("//p[contains(.,'Catalog')]//a").click(),
  ])

  const downloadPath = await download.path()
  expect(downloadPath).toBeTruthy()

  const content = fs.readFileSync(downloadPath!, "utf-8")

  const xml = await parseStringPromise(content)
  let sueNumber: string | null = null

  const numbers = xml.catalog.number as any[]
  for (const el of numbers) {
    if (el.$.id === "Sue") {
      const prefix = el.prefix?.[0] || ""
      const num = el.number?.[0] || ""
      sueNumber = prefix + num
      break
    }
  }

  if (!sueNumber) {
    throw new Error("sue's number not found in catalog.xml")
  }

  await page.locator("input#NumberSue").fill(sueNumber)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})