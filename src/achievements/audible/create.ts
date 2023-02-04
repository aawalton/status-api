/* eslint-disable no-console */
// import _ from 'lodash'
import puppeteer from 'puppeteer'

import database from '../../modules/database'
import { findOrCreateAchievementByTitle } from '../helpers'

// type ValidChallenge = { title: string; miles: number; url: string }

// const parseDistance = (distance: string) => {
//   const imperial = distance.split('/')[0]
//   const pieces = imperial.split(' ')
//   const miles = pieces[0].replace(',', '').replace('mi', '')
//   return _.toNumber(miles)
// }

// const createAchievement = (
//   challenge: ValidChallenge,
//   parentAchievementId: string
// ) =>
//   findOrCreateAchievementByTitle({
//     title: challenge.title,
//     type: 'integer',
//     categoryName: 'health',
//     formatName: 'automatic',
//     circleName: 'solo',
//     target: challenge.miles,
//     link: challenge.url,
//     parentAchievementId,
//   })

export const getAudibleBooks = async () => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto(
    'https://audible.com/search?searchAuthor=Brandon+Sanderson&pageSize=50'
  )
  await Promise.all(promises)

  /* Find the book cards */
  const cards = await page.$$(
    'div.bc-a11y-skiplink-target > span > ul.bc-list > li.bc-list-item'
  )
  console.log(cards.length)

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
      const length = await card.$eval(
        'li.runtimeLabel > span',
        (s) => s.innerText
      )

      // get the language
      const language = await card.$eval(
        'li.languageLabel > span',
        (s) => s.innerText
      )

      // get the release date
      const releaseDate = await card.$eval(
        'li.releaseDateLabel > span',
        (s) => s.innerText
      )

      // return the results
      return { title, url, series, length, language, releaseDate }

      // return { title, url, series, length, language, releaseDate }
      // const body = await card.$('div.tc-card-body')
      // const title = await body
      //   ?.$eval('p.tc-card-name', (s) => s.textContent)
      //   .catch(() => {})
      // const distance = await body
      //   ?.$eval('p.tc-card-distance', (s) => s.textContent)
      //   .catch(() => {})

      // // parse the distance
      // const miles = distance ? parseDistance(distance) : null

      // return { title, miles, url }
    })
  )
  console.log(books)

  // /* Filter out the invalid challenge cards */
  // const validChallenges = challenges.filter(
  //   (challenge) => challenge.title && challenge.miles && challenge.url
  // ) as ValidChallenge[]

  // /* Save data in conqueror_challenges */
  // await database.conquerorChallenges.bulkCreate(validChallenges, {
  //   ignoreDuplicates: true,
  // })

  // /* Find or create the parent achievement */
  // const parentAchievement = await findOrCreateAchievementByTitle({
  //   title: 'Complete All Conqueror Challenges',
  //   type: 'sequence',
  //   categoryName: 'health',
  //   formatName: 'automatic',
  //   circleName: 'solo',
  // })

  // /* Find or create the child achievements */
  // await Promise.all(
  //   validChallenges.map((challenge) =>
  //     createAchievement(challenge, parentAchievement.id)
  //   )
  // )

  /* Shut down puppeteer */
  await browser.close()
}
