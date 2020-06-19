const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

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
                    if (el.message == 'email must be unique') {
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
        const { id_token } = req.body
        let email

        const client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID,
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            
            return User.findOne({
                where: { email }
            })
        })
        .then(data => {
            if (data) {
                return {
                    id: data.id,
                    email: data.email
                }
            } else {
                const user = {
                    email,
                    password: 'google-sign-in'
                }
                return User.create(user)
            }
        })
        .then(data => {
           
            const access_token = jwt.sign({
                id: data.id,
                email: data.email
            }, process.env.JWT_KEY)

            return res.status(200).json({
                
                id: data.id,
                email: data.email,
                access_token
                
            })
        })
        .catch(err => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

}

module.exports = UserController