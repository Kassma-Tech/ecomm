const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/user')


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    const user = await User.findOne({ email })

    if (!email || !password) return res.json({ message: 'email and password must be provided' })


    if (user && (await user.matchPassword(password))) {
        const userInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        const accessToken = generateToken(userInfo);
        const refreshToken = jwt.sign(userInfo, 'kassmatech', { expiresIn: '1d' })

        await User.updateOne({ email: email }, { token: refreshToken })

        res.cookie("refresh", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'None', secure: true })
        res.status(200).send({ accessToken: accessToken })

    } else {
        res.status(401).json({ message: 'Password and email not matched' })
    }

})


const logOut = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies) return res.status(202).json({ message: "no cookies" })

    const refreshToken = cookies?.refresh;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        return res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'None' }).sendStatus(204);
    }

    res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'None' }).sendStatus(204);
}

const generateToken = (payload) => {
    return jwt.sign(payload, 'kassma', { expiresIn: '30m' })
}
module.exports = { login, logOut, generateToken }