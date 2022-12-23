/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import puppeteer from 'puppeteer'

export const signIntoWondrium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  console.log('navigate to https://www.wondrium.com/allprograms')
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto('https://www.wondrium.com/allprograms')
  await Promise.all(promises)

  console.log('find all course links')
  const hrefs = await page.$$eval('div.course-list a', (as) =>
    as.map((a) => a.href)
  )
  console.log(hrefs.length)

  process.exit(0)
}

void signIntoWondrium()
