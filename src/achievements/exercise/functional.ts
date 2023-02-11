import { findOrCreateAchievementByTitle } from '../helpers'

const levels = [1, 7, 30]
const link =
  'https://www.healthline.com/health/fitness-exercise/functional-strength-training'

export const createFunctionalFitnessAchievements = async () => {
  /* Find or create achievement for exercise */
  const exerciseAchievement = await findOrCreateAchievementByTitle({
    title: `Exercise`,
    type: 'collection',
    categoryName: 'health',
    formatName: 'focused',
    circleName: 'solo',
    link,
  })

  /* Find or create achievement for functional fitness */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    formatName: 'focused',
    circleName: 'solo',
    link,
    parentAchievementId: exerciseAchievement.id,
  })

  /* Find or create achievements for workouts */
  const beginnerAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Beginner Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link: `${link}#beginner-routine`,
    level: 1,
  })

  const intermediateAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Intermediate Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link: `${link}#intermediate-routine`,
    level: 2,
  })

  const advancedAchievement = await findOrCreateAchievementByTitle({
    title: `Complete Advanced Functional Fitness Exercises`,
    type: 'sequence',
    categoryName: 'health',
    parentAchievementId: parentAchievement.id,
    formatName: 'focused',
    circleName: 'solo',
    link: `${link}#advanced-routine`,
    level: 3,
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
        link: `${link}#beginner-routine`,
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
        link: `${link}#intermediate-routine`,
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
        link: `${link}#advanced-routine`,
      })
    )
  )
}
