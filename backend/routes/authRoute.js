const { login, logOut, register } = require("../controller/auth");
const refreshToken = require("../controller/refreshToken");

const route = require("express").Router();

route.post('/login', login)
route.post('/register', register)
route.post('/logout', logOut)
route.get('/refresh-token', refreshToken)
module.exports = route;