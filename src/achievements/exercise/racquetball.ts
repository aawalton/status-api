import { findOrCreateAchievementByTitle } from '../helpers'

const levels = [10, 100, 1000, 10000, 100000, 1000000]

export const createExerciseAchievements = async () => {
  /* Find or create parent achievement */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: 'Exercise',
    type: 'collection',
    categoryName: 'health',
    formatName: 'focused',
    circleName: 'solo',
  })

  /* Find or create achievements for categories */
  const categoryAchievement = await findOrCreateAchievementByTitle({
    title: `Play Racquetball`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'with_jenny',
  })

  /* Find or create achievements for levels */
  await Promise.all(
    levels.map((level) =>
      findOrCreateAchievementByTitle({
        title: `Play ${level.toLocaleString()} Games of Racquetball`,
        type: 'integer',
        target: level,
        level,
        parentAchievementId: categoryAchievement.id,
        categoryName: 'health',
        formatName: 'focused',
        circleName: 'with_jenny',
      })
    )
  )
}
