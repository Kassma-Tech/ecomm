const route = require("express").Router();

const cart = require('./cart');
const payment = require('./payment');
const product = require('./product');

route.use('/cart', cart);
route.use('/', product);
route.use('/payment', payment);

module.exports = route;

