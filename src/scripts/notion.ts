/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

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
    await notion.databases.query({
      database_id: ACHIEVEMENTS_DATABASE_ID,
      filter: {
        property: 'title',
        rich_text: { equals: achievement.title },
      },
    })
  }
}

const run = async () => {
  /* Pull achievements from the database */
  const [achievements] = await database.query(
    'select * from achievements limit 1;'
  )
  console.log(achievements.length)

  /* Iterate over achievements, starting with those with no parent */
  for (const achievement of achievements) {
    await addAchievement(achievement as Achievement)
  }

  /* Report success */
  process.exit(0)
}

void run()
