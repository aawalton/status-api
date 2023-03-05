/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import puppeteer from 'puppeteer'

import { sleep } from '../../helpers'
import { findOrCreateNotionAchievement } from '../helpers'

const topLevelPageUrls = [
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

const getPageListsForUrl = async (pageUrl: string): Promise<string[]> => {
  try {
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
  } catch (error) {
    await sleep(500)
    return getPageListsForUrl(pageUrl)
  }
}

const getPageListUrls = async (
  pageUrl: string
): Promise<{ title: string; url: string }[]> => {
  try {
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
  } catch (error) {
    await sleep(500)
    return getPageListUrls(pageUrl)
  }
}

export const syncBritannicaAchievements = async () => {
  const parentTitle = await findOrCreateNotionAchievement({
    title: 'Read the Encyclopedia Britannica',
    type: 'Sequence',
    category: 'Learn',
    format: 'Focused',
    circle: 'Solo',
    link: topLevelPageUrls[0],
  })
  for (const [topLevelIndex, topLevelPageUrl] of topLevelPageUrls.entries()) {
    const topLevelSlug =
      topLevelPageUrl.split('https://www.britannica.com/sitemap/')[1] || '0-9'
    console.log(topLevelSlug)
    const topLevelTitle = await findOrCreateNotionAchievement({
      title: `Read the Encyclopedia Britannica ${topLevelSlug}`,
      type: 'Sequence',
      category: 'Learn',
      format: 'Focused',
      circle: 'Solo',
      link: topLevelPageUrl,
      parentTitle,
      rank: topLevelIndex,
    })
    const pageListUrls = await getPageListsForUrl(topLevelPageUrl)
    for (const [pageListIndex, pageListUrl] of pageListUrls.entries()) {
      const pageListSlug = pageListUrl.split(
        'https://www.britannica.com/sitemap/'
      )[1]
      console.log(pageListSlug)

      const pageListTitle = `Read the Encyclopedia Britannica ${pageListSlug}`
      const pages = await getPageListUrls(pageListUrl)
      const pageAchievements = pages.map((page) => ({
        type: 'to_do' as const,
        to_do: {
          rich_text: [
            {
              type: 'text' as const,
              text: {
                content: page.title,
                link: { url: page.url },
              },
            },
          ],
          checked: false,
        },
      }))

      await findOrCreateNotionAchievement({
        title: pageListTitle,
        type: 'Sequence',
        category: 'Learn',
        format: 'Focused',
        circle: 'Solo',
        link: pageListUrl,
        parentTitle: topLevelTitle,
        rank: pageListIndex,
        children: pageAchievements,
      })

      await sleep(500)
    }
  }
}
