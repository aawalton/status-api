import { findOrCreateNotionAchievement } from '../helpers'

const levels = [1, 7, 30]
const link =
  'https://www.healthline.com/health/fitness-exercise/functional-strength-training'

export const createFunctionalFitnessAchievements = async () => {
  /* Find or create achievement for exercise */
  await findOrCreateNotionAchievement({
    title: `Exercise`,
    type: 'Collection',
    category: 'Health',
    format: 'Focused',
    circle: 'Solo',
    link,
  })

  /* Find or create achievement for functional fitness */
  await findOrCreateNotionAchievement({
    title: `Complete Functional Fitness Exercises`,
    type: 'Sequence',
    category: 'Health',
    format: 'Focused',
    circle: 'Solo',
    link,
    parentTitle: `Exercise`,
  })

  /* Find or create achievements for workouts */
  await findOrCreateNotionAchievement({
    title: `Complete Beginner Functional Fitness Exercises`,
    type: 'Sequence',
    category: 'Health',
    format: 'Focused',
    circle: 'Solo',
    link: `${link}#beginner-routine`,
    rank: 1,
    parentTitle: `Complete Functional Fitness Exercises`,
  })

  await findOrCreateNotionAchievement({
    title: `Complete Intermediate Functional Fitness Exercises`,
    type: 'Sequence',
    category: 'Health',
    format: 'Focused',
    circle: 'Solo',
    link: `${link}#intermediate-routine`,
    rank: 2,
    parentTitle: `Complete Functional Fitness Exercises`,
  })

  await findOrCreateNotionAchievement({
    title: `Complete Advanced Functional Fitness Exercises`,
    type: 'Sequence',
    category: 'Health',
    format: 'Focused',
    circle: 'Solo',
    link: `${link}#advanced-routine`,
    rank: 3,
    parentTitle: `Complete Functional Fitness Exercises`,
  })

  /* Find or create achievements for levels */
  await Promise.all(
    levels.map((level) =>
      findOrCreateNotionAchievement({
        title: `Complete Beginner Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'Integer',
        target: level,
        rank: level,
        parentTitle: `Complete Beginner Functional Fitness Exercises`,
        category: 'Health',
        format: 'Focused',
        circle: 'Solo',
        link: `${link}#beginner-routine`,
      })
    )
  )
  await Promise.all(
    levels.map((level) =>
      findOrCreateNotionAchievement({
        title: `Complete Intermediate Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'Integer',
        target: level,
        rank: level,
        parentTitle: `Complete Intermediate Functional Fitness Exercises`,
        category: 'Health',
        format: 'Focused',
        circle: 'Solo',
        link: `${link}#intermediate-routine`,
      })
    )
  )
  await Promise.all(
    levels.map((level) =>
      findOrCreateNotionAchievement({
        title: `Complete Advanced Functional Fitness Exercises ${level.toLocaleString()} Time${
          level === 1 ? '' : 's'
        }`,
        type: 'Integer',
        target: level,
        rank: level,
        parentTitle: `Complete Advanced Functional Fitness Exercises`,
        category: 'Health',
        format: 'Focused',
        circle: 'Solo',
        link: `${link}#advanced-routine`,
      })
    )
  )
}
