const { createOrder, getOrder, getAllOrder, updateShippingStatus } = require('../controller/order');

const route = require('express').Router();

route.post('/order', createOrder)
route.get('/order/single', getOrder)
route.get('/order/', getAllOrder)
route.patch('/order/:orderId', updateShippingStatus)

module.exports = route