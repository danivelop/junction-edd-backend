const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const dotenv = require('dotenv')
dotenv.config()

exports.signup = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    if (user) {
      return res.status(403).send({ message: 'Email already exists. Please enter another email' })
    }

    const hash = await bcrypt.hash(password, 12)
    await User.create({ username, password: hash })
    return res.send({ message: 'Thanks for signing up with us' })
  } catch (error) {
    return next(error)
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (isValidPassword)  {
        const token = jwt.sign({
          id: user.id,
          username: user.username,
        }, process.env.AUTH_KEY, {
          expiresIn: '3h',
        })
        res.cookie('token', token, { httpOnly: true })
        return res.send({ user: { id: user.id, username: user.username } , message: 'login success!' })
      } else {
        return res.status(401).send({ message: "Password is wrong. Please check your password again." })
      }
    } else {
      return res.status(401).send({ message: "Can't find user. Please check your username again." })
    }
  } catch (error) {
    return next(error)
  }
}

exports.isLoggedIn = (req, res, next) => {
  return res.send({ user: req.decoded })
}