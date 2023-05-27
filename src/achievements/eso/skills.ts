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

export const createSkillLineAchievements = async () => {
  /* Find or create category achievement */
  const categoryTitle = 'Complete Elder Scrolls Online'
  await findOrCreateNotionAchievement({
    title: categoryTitle,
    type: 'Collection',
    ...sharedAttributes,
  })

  /* Find or create parent achievement */
  const parentTitle = 'Complete All Skill Lines for All Characters'
  await findOrCreateNotionAchievement({
    title: parentTitle,
    type: 'Collection',
    parentTitle: categoryTitle,
    ...sharedAttributes,
  })

  /* Find or create achievements for characters */
  const getCharacterTitle = (characterName: string) =>
    `Complete All Skill Lines for ${characterName}`
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

  /* Find or create achievements for skill lines */
  const getSkillLineTitle = (skillLine: string) =>
    `Complete ${skillLine} Skill Line for All Characters`
  const skills = await database.esoSkills.findAll()
  await Promise.all(
    skills.map((skill) =>
      findOrCreateNotionAchievement({
        title: getSkillLineTitle(skill.skillLine),
        type: 'Collection',
        parentTitle,
        rank: skill.rank,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for characters / skill lines */
  for (const character of characters) {
    for (const skill of skills) {
      const characterSkillLineTitle = `Complete ${skill.skillLine} Skill Line for ${character.name}`
      await findOrCreateNotionAchievement({
        title: characterSkillLineTitle,
        type: 'Integer',
        parentTitles: [
          getSkillLineTitle(skill.skillLine),
          getCharacterTitle(character.name),
        ],
        target: skill.target,
        rank: toNumber(skill.rank) + toNumber(character.rank),
        ...sharedAttributes,
      })
      await sleep(500)
    }
  }
}
