/* eslint-disable no-console */
import _ from 'lodash'

import { achievements } from '../../../generated/tables/achievements'
import { wondriumCategories } from '../../../generated/tables/wondriumCategories'
import { wondriumCourseCategories } from '../../../generated/tables/wondriumCourseCategories'
import database from '../../modules/database'

const userId = '17b69a4c-ab2f-4f3e-b8d2-945ba96a4dc6'

export const findOrCreateAchievementForCategory = async (
  category: wondriumCategories
): Promise<achievements | void> => {
  /* If the category already has an achievement, we're done */
  if (category.achievementId) {
    const achievement = await database.achievements.findOne({
      where: { id: _.toString(category.achievementId) },
    })
    if (!achievement)
      throw new Error(
        `achievement not found for ${_.toString(category.achievementId)}`
      )
    console.log(new Date(), `found achievement for ${category.title}`)
    return achievement
  }

  /* If there is parent category, make sure it has an achievement first */
  let parentAchievement
  if (category.parentCategoryId) {
    const parentCategory = await database.wondriumCategories.findOne({
      where: { id: category.parentCategoryId },
    })
    if (!parentCategory)
      throw new Error(`category not found for ${category.parentCategoryId}`)
    parentAchievement = await findOrCreateAchievementForCategory(parentCategory)
  }

  /* Check if there is an achievement that isn't linked */
  const achievementTitle = `Watch all of Wondrium ${category.title}`
  const achievement = await database.achievements.findOne({
    where: { title: achievementTitle },
  })
  if (achievement) {
    /* If there is an achievement, link it */
    await category.update({ achievementId: achievement.id })
    console.log(new Date(), `linked achievement for ${category.title}`)
    return achievement
  }

  /* Otherwise, create one */
  const newAchievement = await database.achievements.create({
    userId,
    categoryName: 'learn',
    type: 'collection',
    parentAchievementId: parentAchievement?.id,
    title: achievementTitle,
    link: category.url,
  })
  await category.update({ achievementId: newAchievement.id })
  console.log(new Date(), `created achievement for ${category.title}`)
  return newAchievement
}

export const findOrCreateAchievementsForCourseCategory = async (
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
    console.log(new Date(), `found achievement for ${_.toString(course.title)}`)
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
    console.log(new Date(), `linked achievement for ${course.title}`)
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
    target: course.episodes,
  })
  await courseCategory.update({ achievementId: newAchievement.id })
  console.log(new Date(), `created achievement for ${course.title}`)
  return newAchievement
}
