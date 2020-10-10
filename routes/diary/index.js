const express = require('express')
const multer = require('multer')
const { getDiary, getDiaries, updateDiary, uploadImage } = require('./diary')
const { verifyToken } = require('../middlewares/verifyToken')

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'public/images/')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.get('/', verifyToken, getDiary)
router.get('/diaries', verifyToken, getDiaries)
router.patch('/:diaryId', verifyToken, updateDiary)
router.post('/', verifyToken, upload.single('image'), uploadImage)

module.exports = router