import { createAchievements } from '../achievements/audible/create'
import { getAudibleAuthors } from '../achievements/audible/scrape'

const run = async () => {
  await getAudibleAuthors()
  await createAchievements()
  process.exit(0)
}

void run()
