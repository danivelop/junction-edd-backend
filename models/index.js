const Sequelize = require("sequelize")
const config = require('../config/config')
const User = require('./User')
const Diary = require('./Diary')
const Movie = require('./Movie')

const env = process.env.NODE_ENV || 'development'
const envConfig = config[env]
const db = {}

const sequelize = new Sequelize(
  envConfig.database, envConfig.username, envConfig.password, envConfig
)

db.sequelize = sequelize
db.Sequelize = Sequelize
db.User = User(sequelize, Sequelize);
db.Diary = Diary(sequelize, Sequelize);
db.Movie = Movie(sequelize, Sequelize);

db.User.hasMany(db.Diary);
db.Diary.belongsTo(db.User);
db.Diary.hasMany(db.Movie);
db.Movie.belongsTo(db.Diary);

module.exports = db
