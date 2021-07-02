/* The config file used to build the docker image */
/** DETAILED CONFIG TYPINGS CAN BE FOUND IN src/types/config.ts! */


module.exports = {
  bot: {
    token: process.env.BOT_TOKEN,
    mode: 'regular',
    clientid: process.env.BOT_ID || '672822334641537041'
  },
  mode: {
    name: 'discovery',
    master: {
      host: process.env.NODE_ENV === 'production'
        ? undefined
        : 'ws://host.docker.internal'
    }
  },
  mongodb: {
    url: process.env.MONGO_URL,
    dbname: 'freestuffbot'
  },
  apisettings: {
    key: process.env.FREESTUFF_KEY,
    type: 'partner',
    baseUrl: process.env.NODE_ENV === 'production'
      ? undefined
      : 'http://host.docker.internal/api/v1'
  },
  thirdparty: {
    sentry: {
      dsn: process.env.SENTRY_DSN
    }
  },
  admins: [
    '137258778092503042'
  ]
}