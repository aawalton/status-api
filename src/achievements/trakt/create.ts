/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Trakt from 'trakt.tv'

const options = {
  client_id: '74eaed60ad7e3ce83c68c0a56f8e5769219103f883190e06fe3e9ea1be7d162f',
  client_secret:
    '4d2830229db753230142432b9429a5ec1217587c0d17c4041bf8307de2683574',
  redirect_uri: null, // defaults to 'urn:ietf:wg:oauth:2.0:oob'
  api_url: null, // defaults to 'https://api.trakt.tv'
  useragent: null, // defaults to 'trakt.tv/<version>'
  pagination: true, // defaults to false, global pagination (see below)
}
const trakt = new Trakt(options)

export const getTraktDeviceToken = async () => {
  const poll = await trakt.get_codes()
  console.log(poll)
}

export const createTraktAchievements = async () => {}
