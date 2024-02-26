const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const addHeadersToRes = async (res) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return res
}

const requireAuth = async (req, res, next) => {

    // verify auth
    const { authorization } = req.headers

    if ( !authorization ){
        return addHeadersToRes(res).status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch( error ){
        console.log(error)
        addHeadersToRes(res).status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = { requireAuth }