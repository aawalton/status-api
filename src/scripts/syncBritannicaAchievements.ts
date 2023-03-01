import { syncBritannicaAchievements } from '../achievements/britannica/create'

const run = async () => {
  await syncBritannicaAchievements()
  process.exit(0)
}

void run()
