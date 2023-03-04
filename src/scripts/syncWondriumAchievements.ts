/* eslint-disable no-console */
import { createAchievementsForCategories } from '../achievements/wondrium/createAchievementsForCategories'
// import { createAchievementsForCourseCategories } from '../achievements/wondrium/createAchievementsForCourseCategories'

const syncAll = async () => {
  /* Create achievements for categories */
  console.log(new Date(), 'creating achievements for categories')
  await createAchievementsForCategories()

  // /* Create achievements for course categories */
  // console.log(new Date(), 'creating achievements for courses')
  // await createAchievementsForCourseCategories()

  /* Report success */
  process.exit(0)
}

void syncAll()
