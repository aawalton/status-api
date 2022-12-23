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

  /* */

  /* */

  /* */
}

void syncAll()
