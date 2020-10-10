const express = require('express')
const { getWeather, getEmotion, getMovies } = require('./rakuten')

const router = express.Router()

router.get('/getWeather', getWeather)
router.get('/getEmotion', getEmotion)
router.get('/getMovies', getMovies)

module.exports = router