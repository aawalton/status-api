import { createZoneAchievements } from '../achievements/eso/create'

const run = async () => {
  await createZoneAchievements()
  process.exit(0)
}

void run()
