/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { toNumber } from 'lodash'

import { sleep } from '../../helpers'
import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const sharedAttributes = {
  category: 'Fun',
  format: 'Automatic',
  circle: 'Solo',
  tags: ['Elder Scrolls Online'],
} as const

const createZoneAchievements = async () => {
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
        rank: character.rank,
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
        rank: zone.rank,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for characters / zones */
  for (const character of characters) {
    for (const zone of zones) {
      const title = `Complete Zone ${zone.name} for ${character.name}`
      await findOrCreateNotionAchievement({
        title,
        type: 'Integer',
        parentTitles: [
          getZoneTitle(zone.name),
          getCharacterTitle(character.name),
        ],
        rank: toNumber(zone.rank) + toNumber(character.rank),
        target: toNumber(zone.target) ?? 1,
        ...sharedAttributes,
      })
      await sleep(500)
    }
  }
}

void createZoneAchievements()
