import { Op } from 'sequelize'

import database from '../../modules/database'
import { findOrCreateAchievementsForCourseCategory } from './helpers'

export const createAchievementsForCourseCategories =
  async (): Promise<void> => {
    const courseCategory = await database.wondriumCourseCategories.findOne({
      where: { achievementId: { [Op.is]: undefined } },
    })
    if (!courseCategory) return undefined
    await findOrCreateAchievementsForCourseCategory(courseCategory)
    return createAchievementsForCourseCategories()
  }
