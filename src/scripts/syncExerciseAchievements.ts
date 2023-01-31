import { createExerciseAchievements } from '../achievements/exercise/create'

const run = async () => {
  await createExerciseAchievements()
  process.exit(0)
}

void run()
