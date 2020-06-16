const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const TaskController = require('../controllers/TaskController')

router.use(authentication)
router.get('/', TaskController.list)
router.post('/', TaskController.add)
router.delete('/:id', authorization, TaskController.delete)
router.get('/:id', authorization, TaskController.edit)
router.put('/:id', authorization, TaskController.editHandler)

module.exports = router