/* eslint-disable no-console */
import _ from 'lodash'
import { Op } from 'sequelize'

import { achievements } from '../../../generated/tables/achievements'
import { wondriumCourseCategories } from '../../../generated/tables/wondriumCourseCategories'
import database from '../../modules/database'
import { findOrCreateAchievementForCategory } from './helpers'

const userId = '17b69a4c-ab2f-4f3e-b8d2-945ba96a4dc6'

const findOrCreateAchievementsForCourseCategory = async (
  courseCategory: wondriumCourseCategories
): Promise<achievements | void> => {
  /* Find the course for the course category */
  const course = await database.wondriumCourses.findOne({
    where: { id: courseCategory.courseId },
  })
  if (!course)
    throw new Error(
      `course not found for ${_.toString(courseCategory.courseId)}`
    )

  /* If the course category already has an achievement, we're done */
  if (courseCategory.achievementId) {
    const achievement = await database.achievements.findOne({
      where: { id: _.toString(courseCategory.achievementId) },
    })
    if (!achievement)
      throw new Error(
        `achievement not found for ${_.toString(courseCategory.achievementId)}`
      )
    console.log(`found achievement for ${_.toString(course.title)}`)
    return achievement
  }

  /* Find the category for the course category */
  const category = await database.wondriumCategories.findOne({
    where: { id: courseCategory.categoryId },
  })
  if (!category)
    throw new Error(
      `category not found for ${_.toString(courseCategory.categoryId)}`
    )

  /* Make sure the category has an achievement first */
  const categoryAchievement = await findOrCreateAchievementForCategory(category)

  /* Check if there is an achievement that isn't linked */
  const achievementTitle = course.title
  const achievement = categoryAchievement
    ? await database.achievements.findOne({
        where: {
          title: course.title,
          parentAchievementId: categoryAchievement.id,
        },
      })
    : undefined

  if (achievement) {
    /* If there is an achievement, link it */
    await courseCategory.update({ achievementId: achievement.id })
    console.log(`linked achievement for ${course.title}`)
    return achievement
  }
  /* Otherwise, create one */
  const newAchievement = await database.achievements.create({
    userId,
    categoryName: 'learn',
    type: 'integer',
    parentAchievementId: categoryAchievement?.id,
    title: achievementTitle,
    link: course.url,
  })
  await courseCategory.update({ achievementId: newAchievement.id })
  console.log(`created achievement for ${course.title}`)
  return newAchievement
}
console.log('outer')
const createAchievementsForCourseCategories = async (): Promise<void> => {
  const courseCategory = await database.wondriumCourseCategories
    .findOne({
      where: { achievementId: { [Op.is]: undefined } },
    })
    .catch(console.log)
  if (!courseCategory) return process.exit(0)
  await findOrCreateAchievementsForCourseCategory(courseCategory)
  return createAchievementsForCourseCategories()
}

void createAchievementsForCourseCategories()
