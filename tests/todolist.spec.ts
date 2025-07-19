import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = 23292

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`todolist (${obstacleId})`, async ({ page }) => {
  const dropTarget = page.locator("table#completed-tasks tbody")
  const rows = page.locator("//table[@id='todo-tasks']//tr[contains(@class,'draggable')]")

  await page.locator("//span[normalize-space()='Drag']").evaluate(el => el.scrollIntoView())
  const rowCount = await rows.count()
  const tasks: number[] = []

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i)
    const numberText = await row.locator("td").first().innerText()
    const number = parseInt(numberText.trim())
    if (!isNaN(number)) {
      tasks.push(number)
    }
  }

  tasks.sort((a, b) => a - b)
  console.log(`tasks -> ${tasks}`)

  for (const number of tasks) {
    const taskRow = page.locator("//table[@id='todo-tasks']//tr[contains(@class,'draggable')]").filter({
      has: page.locator(`td:text-is("${number}")`),
    }).first()

    await taskRow.scrollIntoViewIfNeeded()
    console.log(`dragging ${await taskRow.innerText()}`)
    await taskRow.dragTo(dropTarget)
    await page.waitForTimeout(100)
  }

  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})