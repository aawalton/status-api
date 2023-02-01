import Trakt from 'trakt.tv'

import { achievements } from '../../../generated/tables/achievements'
import { findOrCreateAchievementByTitle } from '../helpers'
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const options = {
  client_id: '74eaed60ad7e3ce83c68c0a56f8e5769219103f883190e06fe3e9ea1be7d162f',
  client_secret:
    '4d2830229db753230142432b9429a5ec1217587c0d17c4041bf8307de2683574',
  redirect_uri: null, // defaults to 'urn:ietf:wg:oauth:2.0:oob'
  api_url: null, // defaults to 'https://api.trakt.tv'
  useragent: null, // defaults to 'trakt.tv/<version>'
  pagination: true, // defaults to false, global pagination (see below)
}
const trakt = new Trakt(options)

const token = {
  access_token:
    '777c6cad34a24e0d7b267930c1c885916bfb70825e0226815f80e5a650372ab6',
  expires: 1683061064722,
  refresh_token:
    'b446e2579e1fe80bf0f834a6fcadf658c4239583f9e43b7d4f037c09ba99a82f',
}

export const getTraktDeviceToken = async () => {
  const poll = await trakt.get_codes()
  console.log(poll)
  await trakt.poll_access(poll)
  const newToken = await trakt.export_token()
  console.log(newToken)
}

type TraktIds = {
  slug: string
}

type TraktUser = {
  username: string
  ids: TraktIds
}

type TraktMovie = {
  title: string
  ids: TraktIds
}

type TraktShow = {
  title: string
  ids: TraktIds
}

type TraktSeason = {
  title: string
  ids: TraktIds
}

type TraktEpisode = {
  title: string
  ids: TraktIds
}

type TraktListItem =
  | {
      type: 'movie'
      movie: TraktMovie
    }
  | {
      type: 'show'
      show: TraktShow
    }
  | {
      type: 'season'
      season: TraktSeason
    }
  | {
      type: 'episode'
      episode: TraktEpisode
    }

type TraktList = {
  name: string
  description: string
  ids: TraktIds
  user: TraktUser
}

type TraktLike = { list: TraktList }

const createMovieAchievements = async (
  movie: TraktMovie,
  parentAchievement: achievements
) => {
  /* Find or create achievement for the movie */
  await findOrCreateAchievementByTitle({
    title: `Watch ${movie.title}`,
    type: 'boolean',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/movies/${movie.ids.slug}`,
  })
}

const createShowAchievements = async (
  show: TraktShow,
  parentAchievement: achievements
) => {
  /* Find or create achievement for the show */
  await findOrCreateAchievementByTitle({
    title: `Watch ${show.title}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/shows/${show.ids.slug}}`,
  })

  /* Find or create achievements for the seasons and episodes */
}

const createSeasonAchievements = async (
  season: TraktSeason,
  parentAchievement: achievements
) => {
  /* Find or create achievement for the season */
  await findOrCreateAchievementByTitle({
    title: `Watch ${season.title}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
  })

  /* Find or create achievements for the episodes */
}

const createEpisodeAchievements = async (
  episode: TraktEpisode,
  parentAchievement: achievements
) => {
  /* Find or create achievement for the episode */
  await findOrCreateAchievementByTitle({
    title: `Watch ${episode.title}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
  })
}

const createListItemAchievements = (
  listItem: TraktListItem,
  parentAchievement: achievements
) => {
  const { type } = listItem
  if (type === 'movie')
    return createMovieAchievements(listItem.movie, parentAchievement)
  if (type === 'show')
    return createShowAchievements(listItem.show, parentAchievement)
  if (type === 'season')
    return createSeasonAchievements(listItem.season, parentAchievement)
  if (type === 'episode')
    return createEpisodeAchievements(listItem.episode, parentAchievement)
  return undefined
}

const createListAchievements = async (
  list: TraktList,
  parentAchievement: achievements
) => {
  console.log(list)

  /* Find or create achievement for the list */
  if (!list.name) return
  const listAchievement = await findOrCreateAchievementByTitle({
    title: `Complete ${list.name}`,
    type: 'collection',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/users/${list.user.ids.slug}/lists/${list.ids.slug}`,
  })

  /* Find or create achievements for the list items */
  const listItems = await trakt.lists.items({
    id: list.ids.slug,
    type: 'movie,show,season,episode',
  })
  await Promise.all(
    listItems.data.map((listItem: TraktListItem) =>
      createListItemAchievements(listItem, listAchievement)
    )
  )
}

export const createTraktAchievements = async () => {
  /* Import the access token (expires 1 May 2023) */
  await trakt.import_token(token)

  /* Get the liked lists */
  const likes = await trakt.users.likes({ username: 'aawalton' })

  /* Find or create parent achievement */
  const parentAchievement = await findOrCreateAchievementByTitle({
    title: 'Complete Trakt Lists',
    type: 'collection',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    link: 'https://trakt.tv/users/aawalton/lists/liked',
  })

  /* Find or create achievements for individual lists */
  await Promise.all(
    likes.data.map((like: TraktLike) =>
      createListAchievements(like.list, parentAchievement)
    )
  )
}
