import { createFunctionalFitnessAchievements } from '../achievements/exercise/functional'

const run = async () => {
  await createFunctionalFitnessAchievements()
  process.exit(0)
}

void run()
