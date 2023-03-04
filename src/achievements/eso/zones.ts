/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { sleep } from '../../helpers'
import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const sharedAttributes = {
  category: 'Fun',
  format: 'Automatic',
  circle: 'Solo',
} as const

export const createZoneAchievements = async () => {
  /* Find or create category achievement */
  const categoryTitle = 'Complete Elder Scrolls Online'
  await findOrCreateNotionAchievement({
    title: categoryTitle,
    type: 'Collection',
    ...sharedAttributes,
  })

  /* Find or create parent achievement */
  const parentTitle = 'Complete All Zones for All Characters'
  await findOrCreateNotionAchievement({
    title: parentTitle,
    type: 'Collection',
    parentTitle: categoryTitle,
    ...sharedAttributes,
  })

  /* Find or create achievements for characters */
  const getCharacterTitle = (characterName: string) =>
    `Complete All Zones for ${characterName}`
  const characters = await database.esoCharacters.findAll()
  await Promise.all(
    characters.map((character) =>
      findOrCreateNotionAchievement({
        title: getCharacterTitle(character.name),
        type: 'Collection',
        parentTitle,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for zones */
  const getZoneTitle = (zoneName: string) =>
    `Complete Zone ${zoneName} for All Characters`
  const zones = await database.esoZones.findAll()
  await Promise.all(
    zones.map((zone) =>
      findOrCreateNotionAchievement({
        title: getZoneTitle(zone.name),
        type: 'Collection',
        parentTitle,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for characters / zones */
  for (const character of characters) {
    const characterAchievement = await database.achievements.findOne({
      where: { title: `Complete All Zones for ${character.name}` },
    })
    if (!characterAchievement) throw new Error('Achievement not found')
    for (const zone of zones) {
      await findOrCreateNotionAchievement({
        title: `Complete Zone ${zone.name} for ${character.name}`,
        type: 'Boolean',
        parentTitles: [
          getZoneTitle(zone.name),
          getCharacterTitle(character.name),
        ],
        ...sharedAttributes,
      })
      await sleep(500)
    }
  }
}
