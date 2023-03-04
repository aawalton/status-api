import { createZoneAchievements } from '../achievements/eso/zones'

const run = async () => {
  await createZoneAchievements()
  process.exit(0)
}

void run()
