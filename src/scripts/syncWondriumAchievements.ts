/* eslint-disable no-console */
// import { createAchievementsForCategories } from '../achievements/wondrium/createAchievementsForCategories'
import { createAchievementsForCourses } from '../achievements/wondrium/createAchievementsForCourses'

const syncAll = async () => {
  /* Create achievements for categories */
  // console.log(new Date(), 'creating achievements for categories')
  // await createAchievementsForCategories()

  // /* Create achievements for course categories */
  console.log(new Date(), 'creating achievements for courses')
  await createAchievementsForCourses()

  /* Report success */
  process.exit(0)
}

void syncAll()
