/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import database from '../../modules/database'
import { findOrCreateNotionAchievement } from '../helpers'

const sharedAttributes = {
  category: 'Fun',
  format: 'Automatic',
  circle: 'Solo',
  tags: ['Elder Scrolls Online'],
} as const

const createCharacterAchievements = async () => {
  /* Find or create category achievement */
  const categoryTitle = 'Complete Elder Scrolls Online'
  await findOrCreateNotionAchievement({
    title: categoryTitle,
    type: 'Collection',
    ...sharedAttributes,
  })

  /* Find or create parent achievement */
  const parentTitle = 'Reach Level 50 for All Characters'
  await findOrCreateNotionAchievement({
    title: parentTitle,
    type: 'Collection',
    parentTitle: categoryTitle,
    ...sharedAttributes,
  })

  /* Find or create achievements for characters */
  const getCharacterTitle = (characterName: string) =>
    `Reach Level 50 for ${characterName}`
  const characters = await database.esoCharacters.findAll()
  await Promise.all(
    characters.map((character) =>
      findOrCreateNotionAchievement({
        title: getCharacterTitle(character.name),
        type: 'Integer',
        target: 50,
        parentTitle,
        rank: character.rank,
        ...sharedAttributes,
      })
    )
  )
}

void createCharacterAchievements()
