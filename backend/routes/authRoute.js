const { login, logOut, register, changePassword } = require("../controller/auth");
const authorize = require("../controller/authorize");
const refreshToken = require("../controller/refreshToken");

const route = require("express").Router();

route.post('/login', login)
route.post('/register', register)
route.post('/logout', logOut)
route.get('/refresh-token', refreshToken)
route.patch('/change-password', authorize, changePassword)
module.exports = route;