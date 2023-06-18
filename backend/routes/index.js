const route = require("express").Router();

const cart = require('./cart');
const payment = require('./payment');
const product = require('./product');
const orderRoute = require('./orderRoute');

route.use('/cart', cart);
route.use('/', product);
route.use('/payment', payment);
route.use('/', orderRoute);

module.exports = route;

