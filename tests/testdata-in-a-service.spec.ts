import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 16384

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`testdata in a service (${obstacleId})`, async ({ page, request }) => {
  await page.locator("a#createTDS").click()

  const key = (await page.locator("td#key").textContent())?.trim()
  const attribute = (await page.locator("td#attribute").textContent())?.trim()

  if (!key || !attribute) {
    throw new Error("key or attribute not found on page.")
  }

  const endpoint = "https://tdsservice.azurewebsites.net/data/obstacle"

  let matched: any = null
  const maxAttempts = 5
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await request.get(endpoint)
    expect(response.ok()).toBeTruthy()
    const dataList = await response.json()

    matched = dataList.find((item: any) => item.data.key === key)

    if (matched && attribute in matched.data) {
      break // match found
    }

    console.log(`attempt ${attempt}: key '${key}' not found yet. retrying...`)
    await new Promise((res) => setTimeout(res, 500)) // wait 500ms
  }

  if (!matched || !(attribute in matched.data)) {
    throw new Error(`attribute '${attribute}' not found for key '${key}'`)
  }

  const result = matched.data[attribute]
  await page.locator("input#result").fill(result)
  await page.locator("a#submit").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})