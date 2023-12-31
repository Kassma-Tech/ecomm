const User = require("../model/user");
const jwt = require('jsonwebtoken');
const { generateToken } = require("./auth");

const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refresh) return res.status(401).json({ message: "You are not an authorized user" });

    const refreshToken = cookies?.refresh
    if (refreshToken == null) return res.status(401).json({ message: "You are not an authorized user" });

    const verifiedUser = await User.findOne({ token: refreshToken });

    if (!verifiedUser) return res.status(401).json({ message: "You are not an authorized user" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, data) => {
        const { _id, name, email, role } = data;
        if (err) return res.status(403).json({ message: "Forbidden" })
        const newToken = generateToken({ _id, name, email, role });
        return res.status(200).json({ accessToken: newToken })
    })
}

module.exports = refreshToken