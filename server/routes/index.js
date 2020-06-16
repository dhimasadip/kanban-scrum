const router = require('express').Router()
const UserRouter = require('./UserRouter')
const TaskRouter = require('./TaskRouter')

router.use('/', UserRouter)
router.use('/tasks', TaskRouter)

module.exports = router