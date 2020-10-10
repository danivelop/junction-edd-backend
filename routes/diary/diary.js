const { Diary, Movie } = require('../../models')

exports.getDiary = async (req, res, next) => {
  const { id: userId } = req.decoded

  try {
    const diary = await Diary.findOne({
      where: { userId },
      include: [{ model: Movie }],
      limit: 1,
      order: [['createdAt' ,'desc']],
    })

    if (diary) {
      const diaryDate = (new Date(diary.createdAt)).getDate()
      const currentDate = (new Date()).getDate()

      if (diaryDate === currentDate) {
        return res.send(diary)
      }
    }

    const newDiary = await Diary.create({
      userId,
    })
    const createdDiary = await Diary.findOne({
      where: {
        id: newDiary.id
      }
    })
    return res.send(createdDiary)
  } catch(error) {
    return next(error)
  }
}

exports.getDiaries = async (req, res, next) => {
  const { id: userId } = req.decoded

  try {
    const diaries = await Diary.findAll({
      where: { userId },
      include: [{ model: Movie }],
    })
    return res.send(diaries)
  } catch(error) {
    next(error)
  }
}

exports.updateDiary = async (req, res, next) => {
  const { id: userId } = req.decoded
  const { diaryId } = req.params
  let movies = null
  
  if (req.body.movies) {
    movies = req.body.movies
    delete req.body.movies
  }

  try {
    const willUpdateDiary = await Diary.findByPk(diaryId);
    if (willUpdateDiary.userId !== userId) {
      return res.status(401).send({ customMessage: "you don't have authority to modify this diary" });
    }

    await Diary.update(req.body, {
      where: { id: diaryId },
    })

    if (movies) {
      await Movie.destroy({ where: { diaryId } })
      await Movie.bulkCreate(
        movies.map(movie => ({
          ...movie,
          diaryId,
        })),
      )
    }

    const updatedDiary = await Diary.findOne({
      where: { id: diaryId },
      raw: true,
    })
    const updatedMovies = await Movie.findAll({
      where: { diaryId },
      raw: true,
    })
    updatedDiary.movies = updatedMovies

    return res.send(updatedDiary)
  } catch(error) {
    next(error)
  }
}
