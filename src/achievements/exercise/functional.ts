import { findOrCreateAchievementByTitle } from '../helpers'

const levels = [1, 7, 30]
const link =
  'https://www.healthline.com/health/fitness-exercise/functional-strength-training#advanced-routine'

export const createFunctionalFitnessAchievements = async () => {
  /* Find or create achievement for functional fitness */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    formatName: 'focused',
    circleName: 'solo',
    link,
  })

  /* Find or create achievements for workouts */
  const beginnerAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Beginner Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link,
  })

  const intermediateAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Intermediate Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link,
  })

  const advancedAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Advanced Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link,
  })

  /* Find or create achievements for levels */
  await Promise.all(
    levels.map((level) =>
      findOrCreateAchievementByTitle({
        title: `Complete Beginner Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'integer',
        target: level,
        level,
        parentAchievementId: beginnerAchievement.id,
        categoryName: 'health',
        formatName: 'focused',
        circleName: 'solo',
        link,
      })
    )
  )
  await Promise.all(
    levels.map((level) =>
      findOrCreateAchievementByTitle({
        title: `Complete Intermediate Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'integer',
        target: level,
        level,
        parentAchievementId: intermediateAchievement.id,
        categoryName: 'health',
        formatName: 'focused',
        circleName: 'solo',
        link,
      })
    )
  )
  await Promise.all(
    levels.map((level) =>
      findOrCreateAchievementByTitle({
        title: `Complete Advanced Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'integer',
        target: level,
        level,
        parentAchievementId: advancedAchievement.id,
        categoryName: 'health',
        formatName: 'focused',
        circleName: 'solo',
        link,
      })
    )
  )
}
