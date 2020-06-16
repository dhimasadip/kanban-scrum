const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req,res,next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            delete data.dataValues.password
            delete data.dataValues.createdAt
            delete data.dataValues.updatedAt

            res.status(201).json(data)
        })
        .catch(err => {
            if (err.errors) {
                let err_data = err.errors.map(el => {
                    if (el.message == 'Email must be unique') {
                        return ' Email already exist'
                    }
                    return el.message
                })

                err_data = err_data.join('. ')

                next({ str_code: 'REGISTRATION_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static login(req,res,next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if (data) {
                if (bcrypt.compareSync(password, data.password)) {
                    const user = {
                        id: data.id,
                        name: data.name,
                        email: data.email
                    }

                    const access_token = jwt.sign(user, process.env.JWT_KEY)
                    user.access_token = access_token

                    return res.status(200).json({ user })

                } else {
                    next({ str_code: 'INCORRECT_PASSWORD'})
                
                }
            } else {
                next({ str_code: 'EMAIL_NOT_FOUND'})

            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static googleSignIn(req,res,next) {

    }

}

module.exports = UserController