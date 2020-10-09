const Sequelize = require("sequelize")
const config = require('../config/config')

const env = process.env.NODE_ENV || 'development'
const envConfig = config[env]
const db = {}

const sequelize = new Sequelize(
  envConfig.database, envConfig.username, envConfig.password, envConfig
)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
