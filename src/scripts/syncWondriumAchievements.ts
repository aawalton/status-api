/* eslint-disable no-console */
import { createAchievementsForCategories } from '../achievements/wondrium/createAchievementsForCategories'
import { createAchievementsForCourseCategories } from '../achievements/wondrium/createAchievementsForCourseCategories'
import { getCourseInfo } from '../achievements/wondrium/getCourseInfo'
import { getCourseList } from '../achievements/wondrium/getCourseList'
import { getSubCategories } from '../achievements/wondrium/getSubCategories'

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
