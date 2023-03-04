import { createHallmarkAchievements } from '../achievements/hallmark/create'

const run = async () => {
  await createHallmarkAchievements()
  process.exit(0)
}

void run()
