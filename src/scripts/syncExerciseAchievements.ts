import { createExerciseAchievements } from '../achievements/exercise/racquetball'

const run = async () => {
  await createExerciseAchievements()
  process.exit(0)
}

void run()
