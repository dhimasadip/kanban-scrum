module.exports = (err,req,res,next) => {

    let err_code, err_msg

    switch (err.str_code) {
        case 'REGISTRATION_VALIDATION':
            err_code = 400
            err_msg = err.err_data
            break
        case 'TASK_VALIDATION':
            err_code = 400
            err_msg = err.err_data
            break
        case 'INCORRECT_PASSWORD':
            err_code = 400
            err_msg = 'Incorrect password'
            break
        case 'INVALID_TOKEN':
            err_code = 400
            err_msg = 'Invalid token'
            break
        case 'UNAUTHORIZED':
            err_code = 403
            err_msg = 'Unauthorized'
            break
        case 'EMAIL_NOT_FOUND':
            err_code = 404
            err_msg = 'Email not found'
            break
        case 'USER_NOT_FOUND':
            err_code = 404
            err_msg = 'User not found'
            break
        case 'TOKEN_NOT_FOUND':
            err_code = 404
            err_msg = 'Token not found'
            break
        case 'TASK_NOT_FOUND':
            err_code = 404
            err_msg = 'Task not found'
            break
        case 'INTERNAL_SERVER_ERROR':
            err_code = 500
            err_msg = 'Internal server error'
            break
            
    }
    

    res.status(err_code).json({ message: err_msg })

}