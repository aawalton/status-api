import { getAudibleAuthors } from '../achievements/audible/create'

const run = async () => {
  await getAudibleAuthors()
  process.exit(0)
}

void run()
