import database from '../../modules/database'
import { findOrCreateAchievementByTitle } from '../helpers'

const sharedAttributes = {
  categoryName: 'fun',
  formatName: 'automatic',
  circleName: 'solo',
}

export const createZoneAchievements = async () => {
  /* Find or create parent achievement */
  const parentAchievement = await database.achievements.findOne({
    where: { title: 'Complete All Zones' },
  })
  if (!parentAchievement) throw new Error('Achievement not found')

  /* Find or create achievements for characters */
  const characters = await database.esoCharacters.findAll()
  await Promise.all(
    characters.map((character) =>
      findOrCreateAchievementByTitle({
        title: `Complete All Zones for ${character.name}`,
        type: 'collection',
        parentAchievementId: parentAchievement.id,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for zones */
  const zones = await database.esoZones.findAll()
  await Promise.all(
    characters.map(async (character) => {
      const characterAchievement = await database.achievements.findOne({
        where: { title: `Complete All Zones for ${character.name}` },
      })
      if (!characterAchievement) throw new Error('Achievement not found')
      await Promise.all(
        zones.map((zone) =>
          findOrCreateAchievementByTitle({
            title: `Complete Zone ${zone.name} for ${character.name}`,
            type: 'boolean',
            parentAchievementId: characterAchievement.id,
            ...sharedAttributes,
          })
        )
      )
    })
  )
}
