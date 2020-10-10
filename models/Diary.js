const Diary = (sequelize, DataTypes) => (
  sequelize.define('diary', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    emotion: {
      type: DataTypes.STRING(10),
      validate: {
        isIn: [['angry', 'sad', 'tired', 'flustered', 'happy', 'love', 'joy']]
      },
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
)

module.exports = Diary
