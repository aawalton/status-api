import { createTraktAchievements } from '../achievements/trakt/create'

const run = async () => {
  await createTraktAchievements()
}

void run()
