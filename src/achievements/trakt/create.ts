/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Trakt from 'trakt.tv'

import { sleep } from '../../helpers'
import { findOrCreateNotionAchievement } from '../helpers'

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
  parentTitle: string,
  level?: number
) => {
  /* Find or create achievement for the movie */
  const movieTitle = await findOrCreateNotionAchievement({
    title: `Watch ${movie.title} Movie`,
    type: 'Boolean',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    parentTitle,
    link: `https://trakt.tv/movies/${movie.ids.slug}`,
    rank: level,
    target: 1,
  })
  console.log(movieTitle)
}

const createEpisodeAchievements = async (
  show: TraktShow,
  episode: TraktEpisode,
  parentTitle: string,
  level?: number
) => {
  /* Find or create achievement for the episode */
  const episodeTitle = await findOrCreateNotionAchievement({
    title: `Watch ${show.title} Season ${episode.season} Episode ${episode.number}`,
    type: 'Boolean',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    parentTitle,
    link: `https://trakt.tv/shows/${show.ids.slug}/seasons/${episode.season}/episodes/${episode.number}`,
    rank: level ?? episode.number,
    target: 1,
  })
  console.log(episodeTitle)
}

const range = (start: number, end: number, length = end - start) =>
  Array.from({ length }, (_, i) => start + i)

const createSeasonAchievements = async (
  show: TraktShow,
  season: TraktSeason,
  parentTitle: string,
  level?: number
) => {
  /* Find or create achievement for the season */
  const seasonTitle = await findOrCreateNotionAchievement({
    title: `Watch ${show.title} Season ${season.number}`,
    type: 'Sequence',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    parentTitle,
    link: `https://trakt.tv/shows/${show.ids.slug}/seasons/${season.number}`,
    rank: level ?? season.number,
  })
  console.log(seasonTitle)

  /* Find or create achievements for the episodes */
  const episodes = range(1, season.episode_count)
  for (const episodeNumber of episodes) {
    await createEpisodeAchievements(
      show,
      { season: season.number, number: episodeNumber },
      seasonTitle
    )
    await sleep(500)
  }
}

const createShowAchievements = async (
  show: TraktShow,
  parentTitle: string,
  level?: number
) => {
  /* Find or create achievement for the show */
  const showTitle = await findOrCreateNotionAchievement({
    title: `Watch ${show.title}`,
    type: 'Sequence',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    parentTitle,
    link: `https://trakt.tv/shows/${show.ids.slug}`,
    rank: level,
  })
  console.log(showTitle)

  /* Find or create achievements for the seasons and episodes */
  const summary = await trakt.seasons.summary({
    id: show.ids.slug,
    extended: 'full',
  })
  const seasons = summary.data
  for (const season of seasons) {
    await createSeasonAchievements(show, season, showTitle)
    await sleep(500)
  }
}

const createListItemAchievements = (
  listItem: TraktListItem,
  parentTitle: string
) => {
  const { type } = listItem
  if (type === 'movie')
    return createMovieAchievements(listItem.movie, parentTitle, listItem.rank)
  if (type === 'show')
    return createShowAchievements(listItem.show, parentTitle, listItem.rank)
  if (type === 'season')
    return createSeasonAchievements(
      listItem.show,
      listItem.season,
      parentTitle,
      listItem.rank
    )
  if (type === 'episode')
    return createEpisodeAchievements(
      listItem.show,
      listItem.episode,
      parentTitle,
      listItem.rank
    )
  return undefined
}

const createListAchievements = async (list: TraktList, parentTitle: string) => {
  /* Find or create achievement for the list */
  if (!list.name) return
  const listTitle = await findOrCreateNotionAchievement({
    title: `Complete ${list.name}`,
    type: 'Sequence',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    parentTitle,
    link: `https://trakt.tv/users/${list.user.ids.slug}/lists/${list.ids.slug}`,
  })
  console.log(listTitle)

  /* Find or create achievements for the list items */
  const listItems = await trakt.users.list.items.get({
    username: list.user.ids.slug,
    id: list.ids.slug,
    type: 'movie,show,season,episode',
    extended: 'full',
  })
  for (const listItem of listItems.data) {
    await createListItemAchievements(listItem as TraktListItem, listTitle)
    await sleep(500)
  }
}

export const createTraktAchievements = async () => {
  /* Import the access token (expires 1 May 2023) */
  await trakt.import_token(token)

  /* Get the liked lists */
  const likes = await trakt.users.likes({
    username: 'aawalton',
    limit: 100,
  })

  /* Find or create parent achievement */
  const parentTitle = await findOrCreateNotionAchievement({
    title: 'Complete Trakt Lists',
    type: 'Collection',
    category: 'Fun',
    format: 'Video',
    circle: 'Solo',
    link: 'https://trakt.tv/users/aawalton/lists/liked',
  })
  console.log(parentTitle)

  /* Find or create achievements for individual lists */
  for (const like of likes.data) {
    await createListAchievements((like as TraktLike).list, parentTitle)
    await sleep(500)
  }
}
