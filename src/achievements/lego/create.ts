import { findOrCreateNotionAchievement } from '../helpers'

const sets = [
  { name: 'LEGO Art World Map', target: 11695 },
  { name: 'LEGO Icons Eiffel Tower', target: 10001 },
  { name: 'LEGO Titanic', target: 9090 },
  { name: 'LEGO Colosseum', target: 9036 },
  { name: 'LEGO Star Wars UCS Millennium Falcon', target: 7541 },
  { name: 'LEGO Star Wars UCS AT-AT Walker', target: 6785 },
  { name: 'LEGO UCS The Razor Crest', target: 6187 },
  { name: 'LEGO Lord of the Rings Rivendell', target: 6167 },
  { name: 'LEGO Harry Potter Hogwarts Castle', target: 6020 },
  { name: 'LEGO Creator Taj Mahal', target: 5823 },
  { name: 'LEGO Real Madrid – Santiago Bernabéu Stadium', target: 5876 },
  { name: 'LEGO NINJAGO City Gardens', target: 5685 },
  { name: 'LEGO Harry Potter Diagon Alley', target: 5544 },
  { name: 'LEGO Camp Nou - FC Barcelona', target: 5508 },
  { name: 'LEGO Hogwarts Express Collectors Edition', target: 5129 },
  { name: 'LEGO NINJAGO City', target: 4867 },
  { name: 'LEGO Star Wars UCS Imperial Star Destroyer', target: 4784 },
  { name: 'LEGO Ghostbusters Firehouse Headquarters', target: 4634 },
  { name: 'LEGO Tower Bridge', target: 4287 },
  { name: 'LEGO Art Harry Potter Hogwarts Crests', target: 4247 },
  { name: 'LEGO Art Jim Lee Batman Collection', target: 4167 },
  { name: 'LEGO Creator Big Ben', target: 4163 },
  { name: 'LEGO Art Project - Create Together', target: 4138 },
  { name: 'LEGO Creator Roller Coaster', target: 4123 },
  { name: 'LEGO Technic Liebherr R 9800 Excavator', target: 4108 },
  { name: 'LEGO Technic Rough Terrain Crane', target: 4057 },
  { name: 'LEGO Marvel Hulkbuster', target: 4049 },
  { name: 'LEGO Disney Castle', target: 4043 },
  { name: 'LEGO Star Wars Death Star 2016', target: 4016 },
  { name: 'LEGO Home Alone', target: 3955 },
]

export const createLegoAchievements = async () => {
  /* Find or create parent achievement */
  const parentTitle = 'Complete The Largest LEGO Sets'
  await findOrCreateNotionAchievement({
    title: parentTitle,
    type: 'Collection',
    category: 'Fun',
    format: 'Focused',
    circle: 'Solo',
  })

  await Promise.all(
    sets.map((set, index) =>
      findOrCreateNotionAchievement({
        title: `Build ${set.name}`,
        type: 'Integer',
        category: 'Fun',
        format: 'Focused',
        circle: 'Solo',
        parentTitle,
        target: set.target,
        rank: index,
      })
    )
  )
}
