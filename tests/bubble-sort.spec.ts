import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 73589

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`bubble sort (${obstacleId})`, async ({ page }) => {
  test.setTimeout(3 * Constants.MAX_TIMEOUT)

  const getCurrentList = async () => {
    const elements = await page.locator("#array .num").allTextContents()
    return elements.map(e => parseInt(e.trim(), 10))
  }

  const isSorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false
    }
    return true
  }

  const delay = 300

  while (true) {
    const current = await getCurrentList()
    if (isSorted(current)) break

    // @ts-ignore
    const first = parseInt(await page.locator("//div[@class='bubble']/div[1]").textContent())

    // @ts-ignore
    const second = parseInt(await page.locator("//div[@class='bubble']/div[2]").textContent())

    if (first > second) {
      // console.log(`swapping ${first} and ${second}`)
      await page.locator("button:has-text('Swap')").click()
      await page.waitForTimeout(delay)
    } else {
      // console.log(`no swap needed for ${first} and ${second}`)
    }

    await page.locator("button:has-text('Next')").click()
    await page.waitForTimeout(delay)
  }
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})