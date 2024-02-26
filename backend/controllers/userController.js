const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const addHeadersToRes = async (res) => {

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