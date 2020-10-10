const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const dotenv = require('dotenv')
dotenv.config()

exports.signup = async (req, res, next) => {
  const { userId, password } = req.body

  try {
    const user = await User.findOne({ where: { userId } })
    if (user) {
      return res.status(403).send({ message: 'Email already exists. Please enter another email' })
    }

    const hash = await bcrypt.hash(password, 12)
    await User.create({ userId, password: hash })
    return res.send({ message: 'Thanks for signing up with us' })
  } catch (error) {
    return next(error)
  }
}

exports.login = async (req, res, next) => {
  const { userId, password } = req.body

  try {
    const user = await User.findOne({ where: { userId } })
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (isValidPassword)  {
        const token = jwt.sign({
          id: user.id,
          userId: user.userId,
        }, process.env.AUTH_KEY, {
          expiresIn: '30m',
        })
        res.cookie('token', token, { httpOnly: true })
        return res.send({ user: { id: user.id, userId: user.userId } , message: 'login success!' })
      } else {
        return res.status(403).send({ message: "Password is wrong. Please check your password again." })
      }
    } else {
      return res.status(404).send({ message: "Can't find user. Please check your email again." })
    }
  } catch (error) {
    return next(error)
  }
}

exports.isLoggedIn = (req, res, next) => {
  return res.send({ user: req.decoded })
}