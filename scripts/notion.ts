/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const run = async () => {
  const listUsersResponse = await notion.users.list({})
  console.log(listUsersResponse)
  process.exit(-1)
}

void run()
