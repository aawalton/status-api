/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash'

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
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for skill lines */
  const getSkillLineTitle = (skillLine: string) =>
    `Complete ${skillLine} Skill Line for All Characters`
  const skillLevels = await database.esoSkills.findAll()
  const skillLines = _.uniq(skillLevels.map((skill) => skill.skillLine))
  await Promise.all(
    skillLines.map((skillLine) =>
      findOrCreateNotionAchievement({
        title: getSkillLineTitle(skillLine),
        type: 'Collection',
        parentTitle,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for characters / skill lines */
  for (const character of characters) {
    for (const skillLine of skillLines) {
      const characterSkillLineTitle = `Complete ${skillLine} Skill Line for ${character.name}`
      await findOrCreateNotionAchievement({
        title: characterSkillLineTitle,
        type: 'Sequence',
        parentTitles: [
          getSkillLineTitle(skillLine),
          getCharacterTitle(character.name),
        ],
        ...sharedAttributes,
      })
      await sleep(500)
      const skillLineLevels = await database.esoSkills.findAll({
        where: { skillLine },
      })
      for (const skillLineLevel of skillLineLevels) {
        const skillLineLevelTitle = `Complete ${skillLineLevel.skillLine} Level ${skillLineLevel.level} for ${character.name} `
        await findOrCreateNotionAchievement({
          title: skillLineLevelTitle,
          type: 'Integer',
          target: skillLineLevel.target,
          parentTitle: characterSkillLineTitle,
          ...sharedAttributes,
        })
        await sleep(500)
      }
    }
  }
}
