const { createOrder } = require('../controller/order');

const route = require('express').Router();

route.post('/order', createOrder)

module.exports = route