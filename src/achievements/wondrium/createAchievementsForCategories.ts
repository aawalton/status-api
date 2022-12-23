import { Op } from 'sequelize'

import database from '../../modules/database'
import { findOrCreateAchievementForCategory } from './helpers'

export const createAchievementsForCategories = async (): Promise<void> => {
  const category = await database.wondriumCategories.findOne({
    where: { achievementId: { [Op.is]: undefined } },
  })
  if (!category) return undefined
  await findOrCreateAchievementForCategory(category)
  return createAchievementsForCategories()
}
