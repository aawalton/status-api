import { findOrCreateNotionAchievement } from '../helpers'

const levels = [10, 100, 1000, 10000, 100000, 1000000]

export const createExerciseAchievements = async () => {
  /* Find or create achievements for categories */
  await findOrCreateNotionAchievement({
    title: 'Play Racquetball',
    type: 'Sequence',
    category: 'Health',
    format: 'Focused',
    circle: 'Jenny',
  })

  /* Find or create achievements for levels */
  await Promise.all(
    levels.map((level) =>
      findOrCreateNotionAchievement({
        title: `Play ${level.toLocaleString()} Games of Racquetball`,
        type: 'Integer',
        target: level,
        rank: level,
        parentTitle: 'Play Racquetball',
        category: 'Health',
        format: 'Focused',
        circle: 'Jenny',
      })
    )
  )
}
