import database from '../../modules/database'

export const createAchievements = async () => {
  /* Get all the books */
  const books = await database.audibleBooks.findAll()

  /* Find or create top level achievement */

  /* Find or create achievements for categories */

  /* Find or create achievements for authors */

  /* Find or create achievements for series */

  /* Find or create achievements for books */
}
