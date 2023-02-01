/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import Trakt from 'trakt.tv'

import { achievements } from '../../../generated/tables/achievements'
import { findOrCreateAchievementByTitle } from '../helpers'
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

type TraktUser = {
  username: string
  ids: { slug: string }
}

type TraktMovie = {
  title: string
  ids: { slug: string }
}

type TraktShow = {
  title: string
  ids: { slug: string }
}

type TraktSeason = {
  number: number
  episode_count: number
}

type TraktEpisode = {
  season: number
  number: number
}

type TraktListItem =
  | {
      rank: number
      type: 'movie'
      movie: TraktMovie
    }
  | {
      rank: number
      type: 'show'
      show: TraktShow
    }
  | {
      rank: number
      type: 'season'
      season: TraktSeason
      show: TraktShow
    }
  | {
      rank: number
      type: 'episode'
      episode: TraktEpisode
      show: TraktShow
    }

type TraktList = {
  name: string
  description: string
  ids: { slug: string }
  user: TraktUser
}

type TraktLike = { list: TraktList }

const createMovieAchievements = async (
  movie: TraktMovie,
  parentAchievement: achievements,
  level?: number
) => {
  /* Find or create achievement for the movie */
  const movieAchievement = await findOrCreateAchievementByTitle({
    title: `Watch ${movie.title} Movie`,
    type: 'boolean',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/movies/${movie.ids.slug}`,
    level,
  })
  console.log(movieAchievement.title)
}

const createEpisodeAchievements = async (
  show: TraktShow,
  episode: TraktEpisode,
  parentAchievement: achievements,
  level?: number
) => {
  /* Find or create achievement for the episode */
  const episodeAchievement = await findOrCreateAchievementByTitle({
    title: `Watch ${show.title} Season ${episode.season} Episode ${episode.number}`,
    type: 'boolean',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/shows/${show.ids.slug}/seasons/${episode.season}/episodes/${episode.number}`,
    level: level ?? episode.number,
  })
  console.log(episodeAchievement.title)
}

const range = (start: number, end: number, length = end - start) =>
  Array.from({ length }, (_, i) => start + i)

const createSeasonAchievements = async (
  show: TraktShow,
  season: TraktSeason,
  parentAchievement: achievements,
  level?: number
) => {
  /* Find or create achievement for the season */
  const seasonAchievement = await findOrCreateAchievementByTitle({
    title: `Watch ${show.title} Season ${season.number}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/shows/${show.ids.slug}/seasons/${season.number}`,
    level: level ?? season.number,
  })
  console.log(seasonAchievement.title)

  /* Find or create achievements for the episodes */
  const episodes = range(1, season.episode_count)
  await Promise.all(
    episodes.map((episodeNumber) =>
      createEpisodeAchievements(
        show,
        { season: season.number, number: episodeNumber },
        seasonAchievement
      )
    )
  )
}

const createShowAchievements = async (
  show: TraktShow,
  parentAchievement: achievements,
  level?: number
) => {
  /* Find or create achievement for the show */
  const showAchievement = await findOrCreateAchievementByTitle({
    title: `Watch ${show.title}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/shows/${show.ids.slug}`,
    level,
  })
  console.log(showAchievement.title)

  /* Find or create achievements for the seasons and episodes */
  const summary = await trakt.seasons.summary({
    id: show.ids.slug,
    extended: 'full',
  })
  const seasons = summary.data
  await Promise.all(
    seasons.map((season: TraktSeason) =>
      createSeasonAchievements(show, season, showAchievement)
    )
  )
}

const createListItemAchievements = (
  listItem: TraktListItem,
  parentAchievement: achievements
) => {
  const { type } = listItem
  if (type === 'movie')
    return createMovieAchievements(
      listItem.movie,
      parentAchievement,
      listItem.rank
    )
  if (type === 'show')
    return createShowAchievements(
      listItem.show,
      parentAchievement,
      listItem.rank
    )
  if (type === 'season')
    return createSeasonAchievements(
      listItem.show,
      listItem.season,
      parentAchievement,
      listItem.rank
    )
  if (type === 'episode')
    return createEpisodeAchievements(
      listItem.show,
      listItem.episode,
      parentAchievement,
      listItem.rank
    )
  return undefined
}

const createListAchievements = async (
  list: TraktList,
  parentAchievement: achievements
) => {
  /* Find or create achievement for the list */
  if (!list.name) return
  const listAchievement = await findOrCreateAchievementByTitle({
    title: `Complete ${list.name}`,
    type: 'sequence',
    categoryName: 'fun',
    formatName: 'video',
    circleName: 'solo',
    parentAchievementId: parentAchievement.id,
    link: `https://trakt.tv/users/${list.user.ids.slug}/lists/${list.ids.slug}`,
  })
  console.log(listAchievement.title)

  /* Find or create achievements for the list items */
  const listItems = await trakt.lists.items({
    id: list.ids.slug,
    type: 'movie,show,season,episode',
    extended: 'full',
  })
  for (const listItem of listItems.data) {
    await createListItemAchievements(listItem as TraktListItem, listAchievement)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }
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
  console.log(parentAchievement.title)

  /* Find or create achievements for individual lists */
  for (const like of likes.data) {
    await createListAchievements((like as TraktLike).list, parentAchievement)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }
}
