
const jwt = require('jsonwebtoken')


const authorize = (req, res, next) => {

    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    if (token == null)
        return res.status(401).json({ message: 'You are not authorized user' })

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, data) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })

        req.user = data;
        next();
    })

}

module.exports = authorize;