/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import puppeteer from 'puppeteer'

import database from '../../modules/database'

const progressionAuthors = [
  'J.M.+Clarke',
  'Will-Wight',
  'pirateaba',
  'Travis Bagwell',
  'TheFirstDefier',
  'Rhaegar',
  'Zogarth',
  'Shirtaloon',
  'RinoZ',
  'Noret Flood',
]

// const favoriteAuthors = ['Brandon Sanderson', 'David Weber']

// const classicAuthors = ['Isaac Asimov', 'Robert Heinlein', 'Anne McCaffrey']

// const authors = [...progressionAuthors, ...favoriteAuthors, ...classicAuthors]

const getBooksForURL = async (author: string, pageUrl: string) => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto(pageUrl)
  await Promise.all(promises)

  /* Find the book cards */
  const cards = await page.$$(
    'div.bc-a11y-skiplink-target > span > ul.bc-list > li.bc-list-item'
  )

  /* Collect title, url, series, length, language, and release date from the cards */
  const books = await Promise.all(
    cards.map(async (card) => {
      // get the title
      const title = await card.$eval(
        'h3.bc-heading > a.bc-link',
        (s) => s.textContent
      )

      // get the url
      const fullUrl = await card.$eval(
        'h3.bc-heading > a.bc-link',
        (s) => s.href
      )
      const url = fullUrl.split('&ref')[0]

      // get the series
      const seriesElements = await card.$$eval(
        'li.seriesLabel span,li.seriesLable a',
        (as) => as.map((s) => s.innerText ?? s.textContent)
      )
      const series = seriesElements.join('')

      // get the length
      const length = await card
        .$eval('li.runtimeLabel > span', (s) => s.innerText)
        .catch(() => {})

      // get the language
      const language = await card
        .$eval('li.languageLabel > span', (s) => s.innerText)
        .catch(() => {})

      // get the release date
      const releaseDate = await card
        .$eval('li.releaseDateLabel > span', (s) => s.innerText)
        .catch(() => {})

      // return the results
      return { author, title, url, series, length, language, releaseDate }
    })
  )

  /* Filter out invalid books */
  type ValidBook = {
    author: string
    title: string
    url: string
    series?: string
    length?: string
    language?: string
    releaseDate?: string
  }
  const validBooks = books.filter(
    (book) => book.title && book.url && book.language?.includes('English')
  ) as ValidBook[]

  /* Save the results */
  await database.audibleBooks.bulkCreate(validBooks, { ignoreDuplicates: true })

  /* Shut down puppeteer */
  await browser.close()
}

const getPagesForAuthor = async (author: string) => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  const cleanAuthor = author.replace(' ', '+')
  const url = `https://audible.com/search?searchAuthor=${cleanAuthor}&pageSize=50`
  await page.goto(url)
  await Promise.all(promises)

  /* Find the page links */
  const newUrls = await page.$$eval('ul.pagingElements > li > a', (as) =>
    as.map((s) => s.href)
  )
  const urls = [url, ...newUrls]

  /* Get books for each page */
  for (const u of urls) {
    await getBooksForURL(author, u)
  }
}

export const getAudibleAuthors = async () => {
  for (const author of progressionAuthors) {
    console.log(author)
    await getPagesForAuthor(author)
  }
}
