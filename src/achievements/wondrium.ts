import fetch from 'node-fetch'
import parser from 'xml2json'

import supabase from '../modules/supabase'

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

const baseUrl = 'https://www.wondrium.com'

const getCollectionUrls = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/media/sitemap.xml`)
  const text = await response.text()
  const json = await parser.toJson(text)
  const data = JSON.parse(json)
  const urls: WondriumURL[] = data.urlset.url

  const collections = urls
    .filter((u) => u.loc.includes('/allsubjects'))
    .map((u) => u.loc)

  return collections
}

const createCollectionAchievement = async (collectionUrl: string) => {
  const parentUrl = collectionUrl.split('/').slice(0, -1).join('/')
  const parentAchievement = (await supabase
    .from('achievements')
    .select('*')
    .eq('url', parentUrl)) as unknown as { id: string }
  const childAchievement = (await supabase
    .from('achievements')
    .upsert({ type: 'collection', url: collectionUrl })) as unknown as {
    id: string
  }
  if (parentAchievement)
    await supabase.from('achievement_children').upsert({
      parent_achievement_id: parentAchievement.id,
      child_achievement_id: childAchievement.id,
    })
}

const createCollectionAchievements = async () => {
  const collectionUrls = await getCollectionUrls()
  await createCollectionAchievement(collectionUrls[0])
}

const syncWondriumAchievements = async () => {
  await createCollectionAchievements()

  const achievements = await supabase.from('achievements').select('*')
}

export default syncWondriumAchievements
