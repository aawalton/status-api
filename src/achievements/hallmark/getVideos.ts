/* eslint-disable no-console */

import fs from 'fs'
import xml2json from 'xml2json'

type DataType = {
  urlset: {
    url: { loc: string }[]
  }
}

// https://www.hmnow.com/plugins/sitemap/fetch

const getHallmarkPages = () => {
  // Load the xml from file in Node
  const xml = fs.readFileSync('src/achievements/hallmark/data.xml')
  // Convert the xml to json
  const text = xml2json.toJson(xml)
  const json = JSON.parse(text) as DataType
  const urls = json.urlset.url.map((url) => url.loc)

  const tvShows = urls.filter((url) => url.includes('/TV_SHOW/'))
  const tvShowSeasons = urls.filter((url) => url.includes('/TV_SHOW_SEASON/'))
  const tvShowEpisodes = urls.filter((url) => url.includes('/TV_SHOW_EPISODE/'))
  const videos = urls.filter((url) => url.includes('/VIDEO/'))
  console.log('shows', tvShows.length)
  console.log('seasons', tvShowSeasons.length)
  console.log('episodes', tvShowEpisodes.length)
  console.log('videos', videos.length)
}

getHallmarkPages()
