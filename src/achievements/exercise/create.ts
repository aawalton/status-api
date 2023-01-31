import database from '../../modules/database'
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
  const exercises = await database.exercises.findAll()
  await Promise.all(
    exercises.map((exercise) =>
      findOrCreateAchievementByTitle({
        title: `${exercise.preText} ${exercise.postText}`,
        type: 'sequence',
        categoryName: 'health',
        parentAchievementId: parentAchievement.id,
        formatName: exercise.formatName,
        circleName: exercise.circleName,
      })
    )
  )

  /* Find or create achievements for levels */
  await Promise.all(
    exercises.map(async (exercise) => {
      const categoryAchievement = await database.achievements.findOne({
        where: { title: `${exercise.preText} ${exercise.postText}` },
      })
      if (!categoryAchievement) throw new Error('Achievement not found')
      await Promise.all(
        levels.map((level) =>
          findOrCreateAchievementByTitle({
            title: `${exercise.preText} ${level.toLocaleString()} ${
              exercise.postText
            }`,
            type: 'integer',
            target: level,
            level,
            parentAchievementId: categoryAchievement.id,
            categoryName: 'health',
            formatName: exercise.formatName,
            circleName: exercise.circleName,
          })
        )
      )
    })
  )
}
