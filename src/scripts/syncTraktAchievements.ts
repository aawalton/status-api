import { createTraktAchievements } from '../achievements/trakt/create'

const run = async () => {
  await createTraktAchievements()
  process.exit(0)
}

void run()
