/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import _, { toNumber } from 'lodash'

import { Achievement } from './types'
import { achievements } from '../../generated/tables/achievements'
import { sleep } from '../helpers'
import database from '../modules/database'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const ACHIEVEMENTS_DATABASE_ID = '06c79efa-24ae-4ff6-a9d2-09bba773934b'

const getParentAchievementId = async (parentTitle: string): Promise<string> => {
  /* Find the parent achievement */
  const parentResponse = await notion.databases.query({
    database_id: ACHIEVEMENTS_DATABASE_ID,
    filter: {
      property: 'title',
      rich_text: { equals: parentTitle },
    },
  })
  const parentExists = parentResponse.results.length > 0
  if (parentTitle && !parentExists)
    throw new Error(`Parent not found for ${parentTitle}`)
  return parentResponse.results[0].id
}

export const findOrCreateNotionAchievement = async (
  achievement: Achievement
): Promise<string> => {
  try {
    console.log(achievement.title)

    /* Check if the achievement page already exists */
    const response = await notion.databases.query({
      database_id: ACHIEVEMENTS_DATABASE_ID,
      filter: {
        property: 'title',
        rich_text: { equals: achievement.title },
      },
    })
    const alreadyExists = response.results.length > 0

    /* If it already exists, update it */
    if (alreadyExists) {
      const result = response.results[0] as unknown as {
        properties: { Progress: { number: number } }
      }
      const newTarget =
        achievement.type === 'Boolean' ? 1 : achievement.target || 0
      const oldProgress = toNumber(result.properties.Progress.number)
      const newProgress = newTarget > 0 && oldProgress > 0 ? newTarget : 0

      await notion.pages.update({
        page_id: response.results[0].id,
        properties: {
          Target: {
            type: 'number',
            number: newTarget,
          },
          Progress: {
            type: 'number',
            number: newProgress,
          },
        },
      })
      if (newTarget > 0) {
        console.log(result)
        console.log({
          title: achievement.title,
          progress: achievement.progress,
          newTarget,
          newProgress,
        })
      }
      return achievement.title
    }

    /* Find the parent achievements */
    const parentTitleId = achievement.parentTitle
      ? await getParentAchievementId(achievement.parentTitle)
      : null
    const parentTitlesIds = achievement.parentTitles
      ? await Promise.all(
          achievement.parentTitles.map((parentTitle) =>
            getParentAchievementId(parentTitle)
          )
        )
      : []
    const parentAchievementIds = parentTitleId
      ? [parentTitleId, ...parentTitlesIds]
      : parentTitlesIds

    /* If the achievement doesn't exist, add it */
    await notion.pages.create({
      parent: { database_id: ACHIEVEMENTS_DATABASE_ID },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: achievement.title } }],
        },
        Target: {
          type: 'number',
          number: achievement.type === 'Boolean' ? 1 : achievement.target || 0,
        },
        Progress: {
          type: 'number',
          number: _.toNumber(achievement.progress || 0),
        },
        Rank: {
          type: 'number',
          number: _.toNumber(achievement.rank) || 0,
        },
        Type: {
          type: 'select',
          select: { name: achievement.type },
        },
        Category: {
          type: 'select',
          select: { name: achievement.category },
        },
        Format: {
          type: 'select',
          select: { name: achievement.format },
        },
        Circle: {
          type: 'select',
          select: { name: achievement.circle },
        },
        Tags: {
          type: 'multi_select',
          multi_select: achievement.tags?.map((tag) => ({ name: tag })) ?? [],
        },
        ...(achievement.link
          ? { Link: { type: 'url', url: achievement.link } }
          : {}),
        ...(parentAchievementIds
          ? {
              Parent: {
                type: 'relation',
                relation: parentAchievementIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      children: achievement.children,
    })
    return achievement.title
  } catch (error) {
    console.log(error)
    await sleep(1000)
    return findOrCreateNotionAchievement(achievement)
  }
}

/* Previous function that saves achievements to the database, remove once it's no longer called */
export const findOrCreateAchievementByTitle = async ({
  title,
  type,
  categoryName,
  formatName,
  circleName,
  parentAchievementId,
  target,
  level,
  description,
  link,
}: {
  title: string
  type: string
  categoryName: string
  formatName: string
  circleName: string
  parentAchievementId?: string
  target?: number
  level?: number
  description?: string
  link?: string
}): Promise<achievements> => {
  const achievement = await database.achievements.findOne({
    where: parentAchievementId ? { title, parentAchievementId } : { title },
  })
  if (achievement) return achievement
  return database.achievements.create({
    title,
    type,
    categoryName,
    parentAchievementId,
    formatName,
    circleName,
    target,
    level,
    description,
    link,
  })
}
