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

import database from '../../modules/database'

const wondriumCategoryId = '86edf9df-2319-4ef8-a042-4e1ce47cb0cc'

export const getCourseList = async () => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto('https://www.wondrium.com/allprograms')
  await Promise.all(promises)

  /* Find the course links */
  const hrefs = await page.$$eval('div.course-list a', (as) =>
    as.map((a) => a.href)
  )

  /* Create courses in the database */
  const courses = hrefs
    .filter((url) => !url.includes('/allsubjects/'))
    .filter((url) => !url.includes('/collections/'))
    .map((url) => ({ url }))
  await database.wondriumCourses.bulkCreate(courses, { ignoreDuplicates: true })

  /* Create top-level categories in the database */
  const subjects = hrefs.filter((url) => url.includes('/allsubjects/'))
  const collections = hrefs.filter((url) => url.includes('/collections/'))
  const categories = [...subjects, ...collections].map((url) => ({
    url,
    parentCategoryId: wondriumCategoryId,
  }))
  await database.wondriumCategories.bulkCreate(categories, {
    ignoreDuplicates: true,
  })

  /* Shut down puppeteer */
  await browser.close()
}
