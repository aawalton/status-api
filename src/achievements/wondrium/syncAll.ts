/* eslint-disable no-console */
import { createAchievementsForCategories } from './createAchievementsForCategories'
import { createAchievementsForCourseCategories } from './createAchievementsForCourseCategories'
import { getCourseInfo } from './getCourseInfo'
import { getCourseList } from './getCourseList'
import { getSubCategories } from './getSubCategories'

const syncAll = async () => {
  /* Sync the full list of courses and categories */
  console.log(new Date(), 'loading courses')
  await getCourseList()

  /* Sync course info for new courses */
  console.log(new Date(), 'loading course info')
  await getCourseInfo()

  /* Sync sub categories */
  console.log(new Date(), 'loading categories')
  await getSubCategories()

  /* Create achievements for categories */
  console.log(new Date(), 'creating achievements for categories')
  await createAchievementsForCategories()

  /* Create achievements for course categories */
  console.log(new Date(), 'creating achievements for courses')
  await createAchievementsForCourseCategories()

  /* Report success */
  process.exit(0)
}

void syncAll()
