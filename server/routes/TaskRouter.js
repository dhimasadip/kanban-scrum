const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const TaskController = require('../controllers/TaskController')

router.use(authentication)
router.get('/', TaskController.list)
router.post('/', TaskController.add)
router.get('/:id', authorization, TaskController.edit)
router.put('/:id', authorization, TaskController.editHandler)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router