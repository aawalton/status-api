import supabase from "./modules/supabase";
import fetch from 'node-fetch'
import parser from 'xml2json'

type WondriumURL = {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
  'image:image'?: {
    'image:loc': string
    'image:title': string
  }
}

const getCollectionUrls = async (): Promise<string[]> => {
  const response = await fetch('https://www.wondrium.com/media/sitemap.xml')
  const text = await response.text()
  const json = await parser.toJson(text)
  const data = JSON.parse(json)
  const urls: WondriumURL[] = data.urlset.url

  const collections = urls
  .filter(u => u['loc'].includes('/allsubjects/'))
  .map(u => u['loc'])

  return collections
}


const syncWondriumAchievements = async () => {
  const collections = await getCollectionUrls()
  console.log(collections.length)
  
  const achievements = await supabase.from('achievements').select('*')
}


void syncWondriumAchievements()