import { createSkillLineAchievements } from '../achievements/eso/skills'

const run = async () => {
  await createSkillLineAchievements()
  process.exit(0)
}

void run()
