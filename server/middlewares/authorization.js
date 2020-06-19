const { Task } = require('../models')

module.exports = (req,res,next) => {
    const { id } = req.params

    Task.findByPk(id)
    .then(data => {
        console.log(data.dataValues)
        if (!data) next({ str_code: 'TASK_NOT_FOUND' })
        else if (data.UserId != req.user.id) next({ str_code: 'UNAUTHORIZED' })
        else next()
        
    })
    .catch(() => {
        next({ str_code: 'INTERNAL_SERVER_ERROR'})
    })
}