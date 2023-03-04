import { createRacquetballAchievements } from '../achievements/exercise/racquetball'

const run = async () => {
  await createRacquetballAchievements()
  process.exit(0)
}

void run()
