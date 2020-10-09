const dotenv = require('dotenv')
dotenv.config();

const config = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'diary',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: '+09:00'
    },
    timezone: '+09:00'
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'diary',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: '+09:00'
    },
    timezone: '+09:00'
  }
}

module.exports = config
