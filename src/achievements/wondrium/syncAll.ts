import { createAchievementsForCategories } from './createAchievementsForCategories'
import { createAchievementsForCourseCategories } from './createAchievementsForCourseCategories'
import { getCourseInfo } from './getCourseInfo'
import { getCourseList } from './getCourseList'
import { getSubCategories } from './getSubCategories'

const syncAll = async () => {
  /* Sync the full list of courses and categories */
  await getCourseList()

  /* Sync course info for new courses */
  await getCourseInfo()

  /* Sync sub categories */
  await getSubCategories()

  /* Create achievements for categories */
  await createAchievementsForCategories()

  /* Create achievements for course categories */
  await createAchievementsForCourseCategories()

  /* Report success */
  process.exit(0)
}

void syncAll()
