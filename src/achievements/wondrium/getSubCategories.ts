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

export const getSubCategories = async () => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Get the next category */
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)
  const category = await database.wondriumCategories.findOne({
    where: { indexedAt: { [Op.lt]: oneDayAgo } },
  })
  const url = category?.url
  if (!url) return undefined
  console.log(new Date(), `loading sub categories for ${category.title}`)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto(url)
  await Promise.all(promises)

  /* Find the title */
  const titles = await page.$$eval('span.h1', (as) =>
    as.map((s) => s.textContent)
  )
  const title = titles[0]
  if (!title) throw new Error(`Title not found for ${url}`)

  /* Find the subcategory links */
  const subCategoryLinks = await page.$$eval('h4.tray__title a', (as) =>
    as.map((a) => a.href)
  )

  if (subCategoryLinks.length > 0) {
    /* Create sub-categories in the database */
    const categories = subCategoryLinks.map((url) => ({
      url,
      parentCategoryId: category.id,
    }))
    await database.wondriumCategories.bulkCreate(categories, {
      ignoreDuplicates: true,
    })
  } else {
    /* Find all the course links */
    const courseLinks = await page.$$eval('div.grid-view a', (as) =>
      as.map((a) => {
        const urlObj = new URL(a.href)
        urlObj.search = ''
        return urlObj.toString()
      })
    )

    /* Find the courses from the links */
    const courses = await database.wondriumCourses.findAll({
      where: { url: courseLinks },
    })
    const courseIds = courses.map((course) => course.id)
    const courseRows = courseIds.map((courseId) => ({
      courseId,
      categoryId: category.id,
    }))

    /* Map the courses to the category */
    await database.wondriumCourseCategories.bulkCreate(courseRows, {
      ignoreDuplicates: true,
    })
  }

  /* Update the parent category with the title */
  await category.update({ title, indexedAt: new Date() })

  /* Shut down puppeteer */
  await browser.close()

  /* See if there are more to process */
  await getSubCategories()

  return undefined
}
