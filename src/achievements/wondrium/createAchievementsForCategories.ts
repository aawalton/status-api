/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { literal, Op } from 'sequelize'

import { sleep } from '../../helpers'
import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const sharedAttributes = {
  category: 'Learn',
  format: 'Video',
  circle: 'Solo',
  type: 'Collection',
} as const

export const createAchievementsForCategories = async (): Promise<void> => {
  /* Create achievement for top level category */
  const topLevelCategory = await database.wondriumCategories.findOne({
    where: {
      parentCategoryId: { [Op.is]: literal('null') },
    },
  })
  if (!topLevelCategory) throw new Error('No top level category found')
  const topLevelTitle = `Watch Wondrium ${topLevelCategory.title ?? ''}`
  await findOrCreateNotionAchievement({
    title: topLevelTitle,
    link: topLevelCategory.url,
    ...sharedAttributes,
  })

  /* Create achievement for second level categories */
  const secondLevelCategories = await database.wondriumCategories.findAll({
    where: { parentCategoryId: topLevelCategory.id },
  })
  for (const secondLevelCategory of secondLevelCategories) {
    const secondLevelTitle = `Watch Wondrium ${secondLevelCategory.title ?? ''}`
    await findOrCreateNotionAchievement({
      title: secondLevelTitle,
      link: topLevelCategory.url,
      ...sharedAttributes,
      parentTitle: topLevelTitle,
    })
    await sleep(500)

    /* Create achievement for third level categories */
    const thirdLevelCategories = await database.wondriumCategories.findAll({
      where: { parentCategoryId: secondLevelCategory.id },
    })
    for (const thirdLevelCategory of thirdLevelCategories) {
      const thirdLevelTitle = `Watch Wondrium ${thirdLevelCategory.title ?? ''}`
      await findOrCreateNotionAchievement({
        title: thirdLevelTitle,
        link: topLevelCategory.url,
        ...sharedAttributes,
        parentTitle: secondLevelTitle,
      })
      await sleep(500)
    }
  }
}
