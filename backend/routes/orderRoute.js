const { createOrder, getOrder } = require('../controller/order');

const route = require('express').Router();

route.post('/order', createOrder)
route.get('/order/single', getOrder)

module.exports = route