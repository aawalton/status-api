import { Op } from 'sequelize'

import { findOrCreateAchievementForCategory } from './helpers'
import database from '../../modules/database'

export const createAchievementsForCategories = async (): Promise<void> => {
  const category = await database.wondriumCategories.findOne({
    where: {
      achievementId: { [Op.is]: undefined },
      title: { [Op.not]: undefined },
    },
  })
  if (!category) return undefined
  await findOrCreateAchievementForCategory(category)
  return createAchievementsForCategories()
}
