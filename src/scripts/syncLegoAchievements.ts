import { createLegoAchievements } from '../achievements/lego/create'

const run = async () => {
  await createLegoAchievements()
  process.exit(0)
}

void run()
