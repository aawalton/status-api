import { exercises as ExerciseType } from '../../../generated/tables/exercises'
import database from '../../modules/database'
import { findOrCreateAchievementByTitle } from '../helpers'

const sharedAttributes = {
  categoryName: 'health',
  formatName: 'automatic',
  circleName: 'solo',
}

const levels = [10, 100, 1000, 10000, 100000, 1000000]

export const createExerciseAchievements = async () => {
  /* Find or create parent achievement */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: 'Exercise',
    type: 'collection',
    ...sharedAttributes,
  })

  /* Find or create achievements for categories */
  const exercises = await database.exercises.findAll()
  await Promise.all(
    exercises.map((exercise: ExerciseType) =>
      findOrCreateAchievementByTitle({
        title: `${exercise.preText} ${exercise.postText}`,
        type: 'sequence',
        parentAchievementId: parentAchievement.id,
        ...sharedAttributes,
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
            ...sharedAttributes,
          })
        )
      )
    })
  )
}
