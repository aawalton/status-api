import { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints'

export type AchievementType = 'Collection' | 'Sequence' | 'Boolean' | 'Integer'

export type AchievementCategory =
  | 'Faith'
  | 'Love'
  | 'Health'
  | 'Learn'
  | 'Fun'
  | 'Wealth'

export type AchievementFormat = 'Audio' | 'Video' | 'Automatic' | 'Focused'

export type AchievementCircle = 'Solo' | 'Jenny' | 'Group'

export type Achievement =
  | {
      title: string
      target?: number
      progress?: number
      type: 'Collection' | 'Sequence' | 'Boolean'
      category: AchievementCategory
      format: AchievementFormat
      circle: AchievementCircle
      link?: string
      rank?: number
      parentTitle?: string
      parentTitles?: string[]
      children?: Array<BlockObjectRequest>
      tags?: readonly string[]
    }
  | {
      title: string
      target: number
      progress?: number
      type: 'Integer'
      category: AchievementCategory
      format: AchievementFormat
      circle: AchievementCircle
      link?: string
      rank?: number
      parentTitle?: string
      parentTitles?: string[]
      children?: Array<BlockObjectRequest>
      tags?: readonly string[]
    }
