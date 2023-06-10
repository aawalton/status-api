import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const createHallmarkAchievements = async () => {
  /* Migrate the category achievement */
  const categoryAchievement = await database.achievements.findOne({
    where: {
      title: 'Watch All of Hallmark Movies Now',
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
}

void createHallmarkAchievements()
