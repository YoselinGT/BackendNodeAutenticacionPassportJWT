import boom from '@hapi/boom';

const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api']
    if(apiKey === '123'){
        next();
    } else {
        next(boom.unauthorized)
    }
}

const checkAdminRole = (req, res, next) => {
    const user = req.user;
    if(user.role === 'admin'){
        next()
    } else {
        next(boom.unauthorized())
    }
}


const checkRoles = (...roles) => {
    console.log("roles",roles)
    return (req, res, next) => {
        const user = req.user;
        console.log("user",user)
        if(roles.includes(user.role)){
            next()
        } else {
            next(boom.unauthorized())
        }
    }
}

export  {checkApiKey,checkAdminRole,checkRoles};