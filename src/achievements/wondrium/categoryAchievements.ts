/* eslint-disable no-console */
import { Op } from 'sequelize'

import database from '../../modules/database'
import { findOrCreateAchievementForCategory } from './helpers'

const createAchievementsForCategories = async (): Promise<void> => {
  const category = await database.wondriumCategories.findOne({
    where: { achievementId: { [Op.is]: undefined } },
  })
  if (!category) return process.exit(0)
  await findOrCreateAchievementForCategory(category)
  return createAchievementsForCategories()
}

void createAchievementsForCategories()
