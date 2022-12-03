/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import _ from 'lodash'

import database from '../modules/database'

dotenv.config()

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const ACHIEVEMENTS_DATABASE_ID = '06c79efa-24ae-4ff6-a9d2-09bba773934b'

type Achievement = {
  id: string
  title: string
  description: string
  link: string
  target: number
  progress: number
  context: 'passive' | 'active'
  category_name: 'faith' | 'learn' | 'fun'
  type: 'collection' | 'sequence' | 'boolean' | 'integer'
  is_collection: boolean
  parent_title: string
}

const getParentAchievementId = async (
  achievement: Achievement
): Promise<string | null> => {
  if (!achievement.parent_title) return null

  /* Find the parent achievement */
  const parentResponse = await notion.databases.query({
    database_id: ACHIEVEMENTS_DATABASE_ID,
    filter: {
      property: 'title',
      rich_text: { equals: achievement.parent_title },
    },
  })
  const parentExists = parentResponse.results.length > 0
  if (achievement.parent_title && !parentExists)
    throw new Error('Parent not found')
  return parentResponse.results[0].id
}

const addAchievement = async (achievement: Achievement) => {
  /* Check if the achievement page already exists */
  const response = await notion.databases.query({
    database_id: ACHIEVEMENTS_DATABASE_ID,
    filter: {
      property: 'title',
      rich_text: { equals: achievement.title },
    },
  })
  const alreadyExists = response.results.length > 0
  console.log(achievement.title, alreadyExists)
  // console.log(achievement)

  const parentAchievementId = await getParentAchievementId(achievement)

  if (alreadyExists) {
    /* If the achievement already exists, ignore it */
  } else {
    /* If the achievement doesn't exist, add it */
    await notion.pages.create({
      parent: { database_id: ACHIEVEMENTS_DATABASE_ID },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: achievement.title } }],
        },
        ...(achievement.link
          ? { Link: { type: 'url', url: achievement.link } }
          : {}),
        ...(!achievement.is_collection
          ? {
              Target: {
                type: 'number',
                number: achievement.target,
              },
              Progress: {
                type: 'number',
                number: _.toNumber(achievement.progress),
              },
            }
          : {}),
        Context: {
          type: 'select',
          select: { name: _.capitalize(achievement.context) },
        },
        Category: {
          type: 'select',
          select: { name: _.capitalize(achievement.category_name) },
        },
        Type: {
          type: 'select',
          select: { name: _.capitalize(achievement.type) },
        },
        ...(parentAchievementId
          ? {
              Parent: {
                type: 'relation',
                relation: [{ id: parentAchievementId }],
              },
            }
          : {}),
      },
    })
  }
}

const run = async () => {
  /* Pull achievements from the database */
  const [achievements] = (await database.query(
    `select *, (select title from achievements a2 where a1.parent_achievement_id = a2.id) as parent_title
    from achievements a1
    where parent_achievement_id is null and imported_at is null
    or (select imported_at from achievements a2 where a1.parent_achievement_id = a2.id) is not null and imported_at is null
    ;`
  )) as [Achievement[], unknown]
  console.log(achievements.length)

  /* Iterate over achievements, starting with those with no parent */
  for (const achievement of achievements) {
    /* Add the achievement */
    await addAchievement(achievement)

    /* Mark achievement as imported */
    await database.query(
      `update achievements set imported_at = now() where id = '${achievement.id}';`
    )
  }

  /* Report success */
  process.exit(0)
}

void run()
