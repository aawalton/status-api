import { getChallenges } from '../achievements/conqueror/create'

const run = async () => {
  await getChallenges()
  process.exit(0)
}

void run()
