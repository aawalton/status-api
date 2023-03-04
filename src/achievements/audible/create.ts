/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash'

import { audibleBooks } from '../../../generated/tables/audibleBooks'
import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const parseDuration = (duration?: string): number => {
  if (!duration) return 1
  const durationValue = duration.split(':')[1].trim()
  const firstValue = _.toNumber(durationValue.split(' ')[0].trim())
  const firstUnits = durationValue.split(' ')[1].trim()
  if (firstUnits === 'mins') return Math.trunc((firstValue / 60) * 100) / 100
  const minutes = _.toNumber(durationValue.split(' ')[3]?.trim()) || 0
  return firstValue + Math.trunc((minutes / 60) * 100) / 100
}

const parseSeries = (series: string): { name: string; level?: number } => {
  const seriesValue = series.split(':')[1]?.trim()
  const seriesName = seriesValue?.split(',')[0]?.trim()

  const seriesNumberValue = seriesValue?.split(',')[1]?.trim()
  const seriesNumber = seriesNumberValue?.split(' ')[1]?.trim()
  const seriesNumberParsed = Math.trunc(_.toNumber(seriesNumber) * 10)
  const seriesInteger = _.isNaN(seriesNumberParsed) ? 0 : seriesNumberParsed

  return { name: seriesName, level: seriesInteger }
}

const findOrCreateAchievementForAuthor = async (
  author: string,
  parentTitle: string
) => {
  const cleanAuthor = author.replace(' ', '+')
  const link = `https://audible.com/search?searchAuthor=${cleanAuthor}&pageSize=50`

  const title = `Listen to ${author} Audible Books`
  await findOrCreateNotionAchievement({
    title,
    type: 'Collection',
    category: 'Fun',
    format: 'Audio',
    circle: 'Solo',
    parentTitle,
    link,
  })
  return title
}

const findOrCreateAchievementForSeries = async (
  series: string,
  parentTitle: string
) => {
  const title = `Listen to ${series} Audible Books`
  await findOrCreateNotionAchievement({
    title,
    type: 'Sequence',
    category: 'Fun',
    format: 'Audio',
    circle: 'Solo',
    parentTitle,
  })
  return title
}

const findOrCreateAchievementForBook = async (
  book: audibleBooks,
  parentTitle: string,
  level?: number
) => {
  const title = `Listen to ${book.title} by ${book.author}`
  await findOrCreateNotionAchievement({
    title,
    link: book.url,
    type: 'Integer',
    category: 'Fun',
    format: 'Audio',
    circle: 'Solo',
    parentTitle,
    rank: level,
    target: parseDuration(book.length),
  })
  return title
}

const findOrCreateAchievements = async (
  book: audibleBooks,
  parentAchievementId: string
) => {
  const authorTitle = await findOrCreateAchievementForAuthor(
    book.author,
    parentAchievementId
  )

  if (book.series) {
    const { name, level } = parseSeries(book.series)
    const seriesTitle = await findOrCreateAchievementForSeries(
      name,
      authorTitle
    )
    await findOrCreateAchievementForBook(book, seriesTitle, level)
  } else await findOrCreateAchievementForBook(book, authorTitle)
}

export const createAchievements = async () => {
  /* Get all the books */
  const books = await database.audibleBooks.findAll()

  /* Find or create top level achievement */
  const title = 'Listen to LitRPG Audible Books'
  await findOrCreateNotionAchievement({
    title,
    type: 'Collection',
    category: 'Fun',
    format: 'Audio',
    circle: 'Solo',
  })

  /* Find or create achievements for books */
  for (const book of books) {
    console.log(book.title)
    await findOrCreateAchievements(book, title)
  }
}
