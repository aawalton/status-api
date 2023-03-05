/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const sharedAttributes = {
  category: 'Learn',
  format: 'Video',
  circle: 'Solo',
  type: 'Integer',
} as const

export const createAchievementsForCourses = async () => {
  /* Collect courses */
  const courses = await database.wondriumCourses.findAll()

  /* Create achievements for courses */
  for (const course of courses) {
    const courseCategories = await database.wondriumCourseCategories.findAll({
      where: { courseId: course.id },
    })
    const categoryIds = courseCategories.map((c) => c.categoryId)
    const categories = await database.wondriumCategories.findAll({
      where: { id: categoryIds },
    })
    const parentTitles = categories.map(
      (c) => `Watch Wondrium ${c.title ?? ''}`
    )
    const courseTitle = `Watch Wondrium ${course.title ?? ''}`

    await findOrCreateNotionAchievement({
      title: courseTitle,
      link: course.url,
      ...sharedAttributes,
      parentTitles,
      target: course.episodes ?? 1,
    })
  }
}
