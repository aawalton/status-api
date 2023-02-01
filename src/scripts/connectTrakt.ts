import { getTraktDeviceToken } from '../achievements/trakt/create'

const run = async () => {
  await getTraktDeviceToken()
}

void run()
