import { getBritannicaPages } from '../achievements/britannica/scrape'

const run = async () => {
  await getBritannicaPages()
  process.exit(0)
}

void run()
