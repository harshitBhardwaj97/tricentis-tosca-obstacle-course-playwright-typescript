import { test } from "../base/base"
import { expect } from "@playwright/test"
import { parseStringPromise } from "xml2js"
import { Constants } from "../constants/constants"

const obstacleId = 87912

test.beforeEach(async ({ page }) => {
  await page.goto(`${Constants.BASE_URL}/${obstacleId}`)
})

test(`be fast automate (${obstacleId})`, async ({ page }) => {
  await page.locator("a:text('load books')").click()
  const xmlContent = await page.locator("textarea#books").inputValue()

  const parsed = await parseStringPromise(xmlContent)

  const books = parsed.catalog.book
  const bookTitle = "Testing Computer Software"
  const targetBook = books.find((book: any) => book.title?.[0] === bookTitle)

  if (!targetBook) {
    throw new Error(`book titled ${bookTitle} not found`)
  }

  const isbn = targetBook.isbn?.[0]
  if (!isbn) {
    throw new Error("isbn not found for the book")
  }

  console.log(`extracted isbn: ${isbn}`)
  await page.locator("input#isbn").fill(isbn)
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})