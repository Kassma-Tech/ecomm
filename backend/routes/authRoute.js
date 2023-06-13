const { login, logOut } = require("../controller/auth");
const refreshToken = require("../controller/refreshToken");

const route = require("express").Router();

route.post('/login', login)
route.post('/logout', logOut)
route.get('/refresh-token', refreshToken)
module.exports = route;