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
  const json = parser.toJson(text)
  const data = JSON.parse(json) as { urlset: { url: WondriumURL[] } }
  const urls = data.urlset.url

  const collections = urls
    .filter((u) => u.loc.includes('/allsubjects'))
    .map((u) => u.loc)

  return collections
}

const createCollectionAchievement = async (collectionUrl: string) => {
  const parentUrl = collectionUrl.split('/').slice(0, -1).join('/')
  const parent = (await supabase
    .from('achievements')
    .select('id')
    .eq('url', parentUrl)) as { data: { id: string }[] }
  const parentAchievement = parent ? parent.data[0] : undefined
  const child = (await supabase
    .from('achievements')
    .upsert({ type: 'collection', url: collectionUrl })) as {
    data: { id: string }[]
  }
  const childAchievement = child.data[0]
  if (parentAchievement)
    await supabase.from('achievement_children').upsert({
      parent_achievement_id: parentAchievement.id,
      child_achievement_id: childAchievement.id,
    })
}

const createCollectionAchievements = async () => {
  const collectionUrls = await getCollectionUrls()
  for (const collectionUrl of collectionUrls) {
    console.log(collectionUrl)
    await createCollectionAchievement(collectionUrl)
  }
}

const syncWondriumAchievements = async () => {
  await createCollectionAchievements()
}

export default syncWondriumAchievements
