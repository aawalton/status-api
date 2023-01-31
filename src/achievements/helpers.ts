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
}: {
  title: string
  type: string
  categoryName: string
  formatName: string
  circleName: string
  parentAchievementId?: string
  target?: number
  level?: number
}) => {
  const achievement = await database.achievements.findOne({
    where: { title },
  })
  if (achievement) return achievement
  return database.achievements.create({
    title,
    type,
    categoryName,
    parentAchievementId,
    formatName,
    circleName,
    target,
    level,
  })
}
