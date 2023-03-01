/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import puppeteer from 'puppeteer'

const topLevelPages = [
  'https://www.britannica.com/sitemap',
  'https://www.britannica.com/sitemap/a',
  'https://www.britannica.com/sitemap/b',
  'https://www.britannica.com/sitemap/c',
  'https://www.britannica.com/sitemap/d',
  'https://www.britannica.com/sitemap/e',
  'https://www.britannica.com/sitemap/f',
  'https://www.britannica.com/sitemap/g',
  'https://www.britannica.com/sitemap/h',
  'https://www.britannica.com/sitemap/i',
  'https://www.britannica.com/sitemap/j',
  'https://www.britannica.com/sitemap/k',
  'https://www.britannica.com/sitemap/l',
  'https://www.britannica.com/sitemap/m',
  'https://www.britannica.com/sitemap/n',
  'https://www.britannica.com/sitemap/o',
  'https://www.britannica.com/sitemap/p',
  'https://www.britannica.com/sitemap/q',
  'https://www.britannica.com/sitemap/r',
  'https://www.britannica.com/sitemap/s',
  'https://www.britannica.com/sitemap/t',
  'https://www.britannica.com/sitemap/u',
  'https://www.britannica.com/sitemap/v',
  'https://www.britannica.com/sitemap/w',
  'https://www.britannica.com/sitemap/x',
  'https://www.britannica.com/sitemap/y',
  'https://www.britannica.com/sitemap/z',
]

const getPageListsForUrl = async (pageUrl: string) => {
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

  /* Find the page lists */
  const pageListUrls = await page.$$eval(
    'ul.md-az-browse-content > li > a',
    (as) => as.map((s) => s.href)
  )

  /* Shut down puppeteer */
  await browser.close()

  /* Return the page lists */
  return pageListUrls
}

const getPagesForUrl = async (pageUrl: string) => {
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

  /* Find the pages */
  const pageElements = await page.$$('ul.md-az-browse-content > li')
  const pages = await Promise.all(
    pageElements.map(async (pageElement) => {
      const url = await pageElement.$eval('a', (s) => s.href)
      const title = (await pageElement.$eval('a', (s) => s.textContent)) ?? ''
      return { title, url }
    })
  )

  /* Shut down puppeteer */
  await browser.close()

  /* Return the page lists */
  return pages
}

export const getBritannicaPages = async () => {
  const pageListUrls = await getPageListsForUrl(topLevelPages[0])
  const pages = await getPagesForUrl(pageListUrls[0])
  console.log(pages)
}
