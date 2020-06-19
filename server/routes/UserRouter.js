const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', (req,res) => {
    res.status(200).json({author: 'Dhimas Adi Pangestu'})
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-sign-in', UserController.googleSignIn)

module.exports = router