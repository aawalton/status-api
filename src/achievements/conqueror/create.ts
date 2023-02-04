/* eslint-disable no-console */
import _ from 'lodash'
import puppeteer from 'puppeteer'

import database from '../../modules/database'

const parseDistance = (distance: string) => {
  const imperial = distance.split('/')[0]
  const pieces = imperial.split(' ')
  const miles = pieces[0].replace(',', '')
  return _.toNumber(miles)
}

export const getChallenges = async () => {
  /* Set up puppeteer */
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 300000
  page.setDefaultTimeout(timeout)

  /* Load the page */
  const promises = []
  promises.push(page.waitForNavigation())
  await page.goto('https://www.theconqueror.events/all-challenges')
  await Promise.all(promises)

  /* Find the challenge cards */
  const cards = await page.$$('div.challenge-list a.tc-challenge-card')

  /* Collect data from the challenge cards */
  const challenges = await Promise.all(
    cards.map(async (card) => {
      // get the url
      const url = await (
        await card.asElement()?.getProperty('href')
      )?.jsonValue()

      // get the title and distance
      const body = await card.$('div.tc-card-body')
      const title = await body
        ?.$eval('p.tc-card-name', (s) => s.textContent)
        .catch(() => {})
      const distance = await body
        ?.$eval('p.tc-card-distance', (s) => s.textContent)
        .catch(() => {})

      // parse the distance
      const miles = distance ? parseDistance(distance) : null

      return { title, miles, url }
    })
  )

  /* Filter out the invalid challenge cards */
  type ValidChallenge = { title: string; miles: number; url: string }
  const validChallenges = challenges.filter(
    (challenge) => challenge.title && challenge.miles && challenge.url
  ) as ValidChallenge[]

  /* Save data in conqueror_challenges */
  await database.conquerorChallenges.bulkCreate(validChallenges, {
    ignoreDuplicates: true,
  })

  /* Find or create the parent achievement */

  /* Find or create the child achievements */

  /* Shut down puppeteer */
  await browser.close()
}
