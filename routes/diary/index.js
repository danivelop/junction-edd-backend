const express = require('express')
const { getDiary, getDiaries, updateDiary } = require('./diary')
const { verifyToken } = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, getDiary)
router.get('/diaries', verifyToken, getDiaries)
router.patch('/:diaryId', verifyToken, updateDiary)

module.exports = router