import jwt from 'jsonwebtoken'


function createToken(user) {
    return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '8h'})
}

export {
    createToken
}