/* eslint-disable no-console */
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

  /* Report success */
  process.exit(0)
}

void syncAll()
