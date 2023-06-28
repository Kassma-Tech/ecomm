const { createOrder, getOrder } = require('../controller/order');

const route = require('express').Router();

route.post('/order', createOrder)
route.get('/order', getOrder)

module.exports = route