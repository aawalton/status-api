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

const createSkillLineAchievements = async () => {
  /* Find or create category achievement */
  const categoryTitle = 'Complete Elder Scrolls Online'
  await findOrCreateNotionAchievement({
    title: categoryTitle,
    type: 'Collection',
    ...sharedAttributes,
  })

  /* Find or create parent achievement */
  const parentTitle = 'Complete All Skill Lines for All Companions'
  await findOrCreateNotionAchievement({
    title: parentTitle,
    type: 'Collection',
    parentTitle: categoryTitle,
    ...sharedAttributes,
  })

  /* Find or create achievements for companions */
  const getCompanionTitle = (companionName: string) =>
    `Complete All Skill Lines for ${companionName}`
  const companions = await database.esoCompanions.findAll()
  await Promise.all(
    companions.map((companion) =>
      findOrCreateNotionAchievement({
        title: getCompanionTitle(companion.name),
        type: 'Collection',
        parentTitle,
        rank: companion.rank,
        ...sharedAttributes,
      })
    )
  )

  /* Find or create achievements for companions skill lines */
  const skills = await database.esoCompanionSkills.findAll()
  for (const companion of companions) {
    for (const skill of skills) {
      const companionSkillLineTitle = `Complete ${skill.skillLine} Skill Line for ${companion.name}`
      await findOrCreateNotionAchievement({
        title: companionSkillLineTitle,
        type: 'Integer',
        parentTitles: [getCompanionTitle(companion.name)],
        target: skill.target,
        rank: toNumber(skill.rank) + toNumber(companion.rank),
        ...sharedAttributes,
      })
      await sleep(500)
    }
  }
}

void createSkillLineAchievements()
