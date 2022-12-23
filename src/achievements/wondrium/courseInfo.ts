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
import { Op } from 'sequelize'

import database from '../../modules/database'

export const getCourseInfo = async (): Promise<void> => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Get the next course */
  const course = await database.wondriumCourses.findOne({
    where: { title: { [Op.is]: undefined } },
  })
  const url = course?.url
  if (!url) process.exit(0)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto(url)
  await Promise.all(promises)

  /* Find the title */
  const titles = await page.$$eval('div.course-info-container h1', (as) =>
    as.map((s) => s.textContent)
  )
  const title = titles[0]
  if (!title) {
    await course.update({ title: '' })
    return getCourseInfo()
  }

  /* Find the description */
  const descriptions = await page.$$eval(
    'div.course-info-container div.description',
    (as) => as.map((s) => s.textContent)
  )
  const description = descriptions[0]
  if (!description) throw new Error(`Description not found for ${url}`)

  /* Find the episode count */
  const episodes = await page.$$eval(
    'div.lectures-list div.media-table',
    (as) => as.map(() => 1)
  )

  /* Update the course with the details */
  await course.update({ title, description, episodes: episodes.length })

  /* Shut down puppeteer */
  await browser.close()

  /* See if there are more to process */
  return getCourseInfo()
}

void getCourseInfo()
