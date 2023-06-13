const User = require("../model/user");
const jwt = require('jsonwebtoken');
const { generateToken } = require("./auth");

const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    console.log(cookies)
    if (!cookies?.refresh) return res.status(401).json({ message: "You are not an authorized user" });

    const refreshToken = cookies?.refresh
    if (refreshToken == null) return res.status(401).json({ message: "You are not an authorized user" });

    const verifiedUser = await User.findOne({ token: refreshToken });

    if (!verifiedUser) return res.status(401).json({ message: "You are not an authorized user" });

    jwt.verify(refreshToken, "kassmatech", (err, data) => {
        const { _id, name, email, role } = data;
        if (err) return res.status(403).json({ message: "Forbidden" })
        console.log(data)
        const newToken = generateToken({ _id, name, email, role });
        return res.status(200).json({ accessToken: newToken, refreshToken: refreshToken })
    })
}

module.exports = refreshToken