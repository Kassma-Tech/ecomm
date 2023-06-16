const { getClientId } = require('../controller/payment');

const route = require('express').Router();

route.get('/payment', getClientId);

module.exports = route