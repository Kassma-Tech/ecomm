const route = require("express").Router();

const cart = require('./cart');
const payment = require('./payment');
const product = require('./product');
const orderRoute = require('./orderRoute');
const authorize = require("../controller/authorize");

route.use('/cart', authorize, cart);
route.use('/', product);
route.use('/payment', authorize, payment);
route.use('/', authorize, orderRoute);

module.exports = route;

