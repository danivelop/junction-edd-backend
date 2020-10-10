const Movie = (sequelize, DataTypes) => (
  sequelize.define('movie', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
)

module.exports = Movie
