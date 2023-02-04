/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash'

import { audibleBooks } from '../../../generated/tables/audibleBooks'
import database from '../../modules/database'
import { findOrCreateAchievementByTitle } from '../helpers'

const parseDuration = (duration?: string): number => {
  if (!duration) return 1
  const durationValue = duration.split(':')[1].trim()
  const firstValue = _.toNumber(durationValue.split(' ')[0].trim())
  const firstUnits = durationValue.split(' ')[1].trim()
  if (firstUnits === 'mins') return firstValue
  const minutes = _.toNumber(durationValue.split(' ')[3]?.trim()) ?? 0
  return firstValue * 60 + minutes
}

const parseSeries = (series: string): { name: string; level?: number } => {
  const seriesValue = series.split(':')[1]?.trim()
  const seriesName = seriesValue?.split(',')[0]?.trim()

  const seriesNumberValue = seriesValue?.split(',')[1]?.trim()
  const seriesNumber = seriesNumberValue?.split(' ')[1]?.trim()
  const seriesInteger = _.isNumber(seriesNumber)
    ? Math.trunc(_.toNumber(seriesNumber) * 10)
    : 0

  return { name: seriesName, level: seriesInteger }
}

const findOrCreateAchievementForAuthor = async (
  author: string,
  parentAchievementId: string
) => {
  const achievement = await findOrCreateAchievementByTitle({
    title: `Listen to ${author} Audible Books`,
    type: 'collection',
    categoryName: 'fun',
    formatName: 'audio',
    circleName: 'solo',
    parentAchievementId,
  })
  return achievement
}

const findOrCreateAchievementForSeries = async (
  series: string,
  parentAchievementId: string
) => {
  const achievement = await findOrCreateAchievementByTitle({
    title: `Listen to ${series} Audible Books`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'audio',
    circleName: 'solo',
    parentAchievementId,
  })
  return achievement
}

const findOrCreateAchievementForBook = async (
  book: audibleBooks,
  parentAchievementId: string,
  level?: number
) => {
  const achievement = await findOrCreateAchievementByTitle({
    title: `Listen to ${book.title} by ${book.author}`,
    link: book.url,
    type: 'integer',
    categoryName: 'fun',
    formatName: 'audio',
    circleName: 'solo',
    parentAchievementId,
    level,
    target: parseDuration(book.length),
  })
  return achievement
}

const findOrCreateAchievements = async (
  book: audibleBooks,
  parentAchievementId: string
) => {
  const authorAchievement = await findOrCreateAchievementForAuthor(
    book.author,
    parentAchievementId
  )

  if (book.series) {
    const { name, level } = parseSeries(book.series)
    const seriesAchievement = await findOrCreateAchievementForSeries(
      name,
      authorAchievement.id
    )
    await findOrCreateAchievementForBook(book, seriesAchievement.id, level)
  }

  await findOrCreateAchievementForBook(book, authorAchievement.id)
}

export const createAchievements = async () => {
  /* Get all the books */
  const books = await database.audibleBooks.findAll()

  /* Find or create top level achievement */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: 'Listen to Science Fiction and Fantasy Audible Books',
    type: 'collection',
    categoryName: 'fun',
    formatName: 'audio',
    circleName: 'solo',
  })

  /* Find or create achievements for books */
  for (const book of books) {
    console.log(book.title, book.series, book.length)
    await findOrCreateAchievements(book, parentAchievement.id)
  }
}
