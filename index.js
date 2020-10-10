const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')
const hpp = require('hpp')
const dotenv = require('dotenv')
const cors = require('cors')
const logger = require('./logger')
const { sequelize } = require('./models')

const authRouter = require('./routes/auth')
const diaryRouter = require('./routes/diary')
const rakutenRouter = require('./routes/rakuten')

dotenv.config()

const stopServer = async (server, sequelize, signal) => {
  logger.info(`Stopping server with signal: ${signal}`)
  await server.close()
  await sequelize.close()
  process.exit()
}

async function runServer () {
  const app = express()
  const { PORT: port = process.env.NODE_ENV === 'production' ? 8000 : 4000 } = process.env

  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(hpp())
  } else {
    app.use(morgan('dev'))
  }
  
  app.use(cors())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser(process.env.COOKIE_SECRET))

  app.use('/api/auth', authRouter)
  app.use('/api/diary', diaryRouter)
  app.use('/api/rakuten', rakutenRouter)
  
  app.use((err, req, res, next) => {
    logger.error(err.message)
    return res.status(err.status || 500).send({
      message: err.message || 'error occured.'
    });
  });

  const server = http.createServer(app).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })
  } catch (err) {
    stopServer(server, sequelize)
    throw err
  }
}

runServer()
  .then(() => {
    logger.info('run succesfully')
  })
  .catch((ex) => {
    logger.error('Unable run:', ex)
  })