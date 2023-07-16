const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/user')

const register = asyncHandler(async (req, res) => {
    const { name, password, email, role } = req.body;

    if (!name || !password || !email) return res.status(400).json({ message: "All fields must be filled" });

    const isExist = await User.findOne({ email: email });

    if (isExist) return res.status(400).json({ message: "This email is already registered" });

    let register;

    const hashPassword = await bcrypt.hashSync(password, 10);

    if (role)
        register = await User.create({ email, name, password: hashPassword, role });
    else
        register = await User.create({ email, name, password: hashPassword });

    const registeredUser = await User.findOne({ email: email })

    const payload = {
        _id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role
    }

    const accessToken = generateToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });

    res.cookie('refresh', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 1000 * 60 * 60 * 24 }).json({ accessToken: accessToken })
})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

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
        const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' })

        await User.updateOne({ email: email }, { token: refreshToken })

        res.cookie("refresh", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'None', secure: true })
        res.status(200).send({ accessToken: accessToken })

    } else {
        res.status(401).json({ message: 'Password and email not matched' })
    }

})


const logOut = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies) return res.status(202).json({ message: "no cookies" })

    const refreshToken = cookies?.refresh;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        return res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'None' }).sendStatus(204);
    }

    res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'None' }).sendStatus(204);
})

const changePassword = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { _id: userId } = req.user;

    if (!currentPassword || !newPassword || !confirmPassword) return res.status(400).json({ message: "All filed must be filled" });

    if (newPassword !== confirmPassword) return res.status(400).json({ message: "Confirm password correctly" });

    const user = await User.findOne({ _id: userId });

    if (user && await user.matchPassword(currentPassword)) {
        const encodedNewPass = bcrypt.hashSync(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: encodedNewPass });
        return res.status(200).json({ message: "Password changed successfully" });

    } else {
        return res.sendStatus(400)
    }
})



const generateToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '10m' })
}
module.exports = { login, logOut, generateToken, register, changePassword }