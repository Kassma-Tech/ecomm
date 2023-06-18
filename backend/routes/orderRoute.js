const { test } = require('../controller/order');

const route = require('express').Router();

route.post('/test', test)

module.exports = route