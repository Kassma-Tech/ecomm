const { getClientId } = require('../controller/payment');

const route = require('express').Router();

route.get('/', getClientId);

module.exports = route