const express = require('express')
const { getDiary, getDiaries } = require('./diary')
const { verifyToken } = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, getDiary)
router.get('/diaries', verifyToken, getDiaries)

module.exports = router