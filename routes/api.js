/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();

const apiUserRouter = require('./api/user');

router.use('/user', apiUserRouter);

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
