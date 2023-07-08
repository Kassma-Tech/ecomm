const { createOrder, getOrder, getAllOrder } = require('../controller/order');

const route = require('express').Router();

route.post('/order', createOrder)
route.get('/order/single', getOrder)
route.get('/order/', getAllOrder)

module.exports = route