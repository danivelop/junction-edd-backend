const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')
const hpp = require('hpp')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const { PORT: port = process.env.NODE_ENV === 'production' ? 8000 : 4000 } = process.env;

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(helmet())
  app.use(hpp())
} else {
  app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use((err, req, res, next) => {
  logger.error(err.message)
  return res.status(err.status || 500).send({
    message: err.message || 'error occured.'
  })
})

http.createServer(app).listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})