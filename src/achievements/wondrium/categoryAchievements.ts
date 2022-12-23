/* eslint-disable no-console */
import _ from 'lodash'
import { Op } from 'sequelize'

import { achievements } from '../../../generated/tables/achievements'
import { wondriumCategories } from '../../../generated/tables/wondriumCategories'
import database from '../../modules/database'

const userId = '17b69a4c-ab2f-4f3e-b8d2-945ba96a4dc6'

const findOrCreateAchievementForCategory = async (
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
    console.log(`found achievement for ${category.title}`)
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
    console.log(`linked achievement for ${category.title}`)
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
  console.log(`created achievement for ${category.title}`)
  return newAchievement
}

const createAchievementsForCategories = async (): Promise<void> => {
  const category = await database.wondriumCategories.findOne({
    where: { achievementId: { [Op.is]: undefined } },
  })
  if (!category) return process.exit(0)
  await findOrCreateAchievementForCategory(category)
  return createAchievementsForCategories()
}

void createAchievementsForCategories()
