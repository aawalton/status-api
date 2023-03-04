import { Op } from 'sequelize'

import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

export const createHallmarkAchievements = async () => {
  /* Migrate the category achievement */
  const categoryAchievement = await database.achievements.findOne({
    where: {
      title: 'Watch All Hallmark Moview Now Mysteries',
    },
  })
  if (!categoryAchievement) throw new Error('Category achievement not found')
  await findOrCreateNotionAchievement({
    title: categoryAchievement.title ?? '',
    type: 'Collection',
    category: 'Love',
    format: 'Video',
    circle: 'Jenny',
  })

  /* Migrate the series achievements */
  const seriesAchievements = await database.achievements.findAll({
    where: { parentAchievementId: categoryAchievement.id },
  })
  await Promise.all(
    seriesAchievements.map((achievement) =>
      findOrCreateNotionAchievement({
        title: achievement.title ?? '',
        type: 'Collection',
        category: 'Love',
        format: 'Video',
        circle: 'Jenny',
        parentTitle: categoryAchievement.title,
      })
    )
  )

  /* Migrate the movie achievements */
  const movieAchievements = await database.achievements.findAll({
    where: {
      formatName: 'video',
      categoryName: 'love',
      circleName: 'with_jenny',
      parentAchievementId: {
        [Op.and]: {
          [Op.ne]: null,
          [Op.ne]: categoryAchievement.id,
        },
      },
    },
  })
  await Promise.all(
    movieAchievements.map((achievement) => {
      const seriesAchievement = seriesAchievements.find(
        (s) => s.id === achievement.parentAchievementId
      )
      if (!seriesAchievement) throw new Error('Series achievement not found')
      return findOrCreateNotionAchievement({
        title: achievement.title ?? '',
        type: 'Boolean',
        category: 'Love',
        format: 'Video',
        circle: 'Jenny',
        progress: achievement.progress,
        rank: achievement.level,
        parentTitle: seriesAchievement.title,
      })
    })
  )
}
