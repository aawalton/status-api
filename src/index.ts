import supabase from "./modules/supabase";
import fetch from 'node-fetch'
import parser from 'xml2json'

const syncWondriumAchievements = async () => {
  const response = await fetch('https://www.wondrium.com/media/sitemap.xml')
  const text = await response.text()
  const json = await parser.toJson(text)
  const data = JSON.parse(json)
  const urls = data.urlset.url
  console.log(urls.length)

  const achievements = await supabase.from('achievements').select('*')
  console.log(achievements)
}


void syncWondriumAchievements()