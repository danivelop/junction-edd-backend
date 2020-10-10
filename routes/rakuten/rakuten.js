const unirest = require('unirest')
const dotenv = require('dotenv')
dotenv.config()

exports.getWeather = async (req, res, next) => {
  try {
    const request = unirest('GET', 'https://weatherbit-v1-mashape.p.rapidapi.com/current')

    request.query({
      'lang': 'en',
      'lon': '126.970868',
      'lat': '37.555095',
    })
    request.headers({
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAKUTEN_KEY,
      'useQueryString': true,
    })

    const result = await new Promise((resolve, reject) => {
      request.end(function (res) {
        if (res.error) {
          reject(new Error(res.error))
        }

        resolve(res.body)
      })
    })

    return res.send(result)
  } catch(error) {
    return next(error)
  }
}

exports.getEmotion = async (req, res, next) => {
  try {
    const { content } = req.query
    const request = unirest('POST', 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/')

    request.headers({
      'x-rapidapi-host': 'twinword-sentiment-analysis.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAKUTEN_KEY,
      'content-type': 'application/x-www-form-urlencoded',
      'useQueryString': true,
    })
    request.form({
      'text': content,
    })

    const result = await new Promise((resolve, reject) => {
      request.end(function (res) {
        if (res.error) {
          reject(new Error(res.error))
        }

        resolve(res.body)
      })
    })

    return res.send(result)
  } catch(error) {
    return next(error)
  }
}

exports.getMovies = async (req, res, next) => {
  try {
    const { title } = req.query
    const request = unirest('GET', 'https://movie-database-imdb-alternative.p.rapidapi.com/')

    request.query({
      's': title,
    })
    request.headers({
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAKUTEN_KEY,
      'useQueryString': true,
    })

    const result = await new Promise((resolve, reject) => {
      request.end(function (res) {
        if (res.error) {
          reject(new Error(res.error))
        }

        resolve(res.body)
      })
    })

    return res.send(result)
  } catch(error) {
    return next(error)
  }
}
