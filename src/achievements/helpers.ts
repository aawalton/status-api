import { achievements } from '../../generated/tables/achievements'
import database from '../modules/database'

export const findOrCreateAchievementByTitle = async ({
  title,
  type,
  categoryName,
  formatName,
  circleName,
  parentAchievementId,
  target,
  level,
  description,
  link,
}: {
  title: string
  type: string
  categoryName: string
  formatName: string
  circleName: string
  parentAchievementId?: string
  target?: number
  level?: number
  description?: string
  link?: string
}): Promise<achievements> => {
  const achievement = await database.achievements.findOne({
    where: parentAchievementId ? { title, parentAchievementId } : { title },
  })
  if (achievement) return achievement
  return database.achievements
    .create({
      title,
      type,
      categoryName,
      parentAchievementId,
      formatName,
      circleName,
      target,
      level,
      description,
      link,
    })
    .catch(() =>
      findOrCreateAchievementByTitle({
        title,
        type,
        categoryName,
        formatName,
        circleName,
        parentAchievementId,
        target,
        level,
        description,
        link,
      })
    )
}
