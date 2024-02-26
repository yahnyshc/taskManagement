const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const addHeadersToRes = async (res) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return res
}

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }) 
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        addHeadersToRes(res).status(200).json({email, token})
    } catch (error) {
        addHeadersToRes(res).status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)

        addHeadersToRes(res).status(200).json({email, token})
    } catch (error) {
        addHeadersToRes(res).status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}