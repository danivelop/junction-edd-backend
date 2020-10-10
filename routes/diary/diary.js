const { Diary } = require('../../models')

exports.getDiary = async (req, res, next) => {
  const { id } = req.decoded

  try {
    const diary = await Diary.findOne({
      limit: 1,
      order: [['createdAt' ,'desc']],
      raw: true,
    })

    if (diary) {
      const diaryDate = (new Date(diary.createdAt)).getDate()
      const currentDate = (new Date()).getDate()

      if (diaryDate === currentDate) {
        return res.send(diary)
      }
    }

    const newDiary = await Diary.create({
      userId: id,
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
  const { id } = req.decoded

  try {
    const diaries = await Diary.findAll({
      where: {
        userId: id,
      }
    })
    return res.send(diaries)
  } catch(error) {
    next(error)
  }
}
