import { getAudibleBooks } from '../achievements/audible/create'

const run = async () => {
  await getAudibleBooks()
  process.exit(0)
}

void run()
