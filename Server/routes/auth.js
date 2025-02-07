const express = require('express')
const router = express.Router()

// import controller
const { register,login,currentUser } = require('../controllers/auth')

router.post('/register', register) // register route
router.post('/login', login) // login route
router.post('/current-user', currentUser) // current user route
router.post('/current-admin', currentUser) // current admin route

module.exports = router; // export the router