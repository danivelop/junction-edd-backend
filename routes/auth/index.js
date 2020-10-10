const express = require('express')
const { signup, login, isLoggedIn } = require('./auth')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/isLoggedIn', verifyToken, isLoggedIn);

module.exports = router
