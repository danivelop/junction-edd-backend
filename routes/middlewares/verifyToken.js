const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.cookies.token, process.env.AUTH_KEY)
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.status = 419;
      return next(error)
    }

    error.status = 401;
    return next(error)
  }
}