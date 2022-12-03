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
  console.log({ alreadyExists })

  if (alreadyExists) {
    /* If the achievement already exists, update it */
    await notion.databases.query({
      database_id: ACHIEVEMENTS_DATABASE_ID,
      filter: {
        property: 'title',
        rich_text: { equals: achievement.title },
      },
    })
  } else {
    /* If the achievement doesn't exist, add it */
    console.log(achievement)
    await notion.pages.create({
      parent: { database_id: ACHIEVEMENTS_DATABASE_ID },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: achievement.title } }],
        },
        // Link: { type: 'url', url: achievement.link },
        ...(!achievement.is_collection
          ? {
              Target: {
                type: 'number',
                number: achievement.target,
              },
              Progress: {
                type: 'number',
                number: achievement.progress,
              },
            }
          : {}),
        // Context: {
        //   type: 'select',
        //   select: { name: _.capitalize(achievement.context) },
        // },
        // Category: {
        //   type: 'select',
        //   select: { name: _.capitalize(achievement.category_name) },
        // },
        // Type: {
        //   type: 'select',
        //   select: { name: _.capitalize(achievement.type) },
        // },
      },
    })
  }
}

const run = async () => {
  /* Pull achievements from the database */
  const [achievements] = (await database.query(
    `select * from achievements a1
    where parent_achievement_id is null and imported_at is null
    or (select imported_at from achievements a2 where a1.parent_achievement_id = a2.id) is not null
    limit 1;`
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
