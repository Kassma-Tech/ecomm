require('dotenv').config();

const getClientId = (req, res) => {
    res.status(200).json({ clientId: process.env.CLIENT_ID })
}

module.exports = { getClientId }