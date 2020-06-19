const { Task, User } = require('../models')

class TaskController {
    
    static list(req,res,next) {
        
        Task.findAll({
            include: User
        })
        .then(data => {
            
            res.status(200).json(data)
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static add(req,res,next) {
        const newTask = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            due_date: new Date(req.body.due_date),
            UserId: req.user.id
        }

        Task.create(newTask)
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            if(err.errors) {
                let err_data = err.errors.map(el => el.message)
                err_data = err_data.join('. ')

                next({ str_code: 'TASK_VALIDATION', err_data })

            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static delete(req,res,next) {
        const { id } = req.params

        Task.destroy({
            where: { id }
        })
        .then(() => {
            res.status(200).json({ message: 'Succesfully delete task' })
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })

    }

    static edit(req,res,next) {
        const { id } = req.params

        Task.findByPk(id, {
            include: User
        })
        .then(data => {
            if (data) {
                res.status(200).json( data )
            } else {
                next({ str_code: 'TASK_NOT_FOUND' })
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static editHandler(req,res,next) {

        const updated_task = {
            category: req.body.category
        }

        Task.update(updated_task, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({ message: 'Successfully update task' })
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })

    }
}

module.exports = TaskController