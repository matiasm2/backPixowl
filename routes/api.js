/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();

const apiPostsRouter = require('./api/posts');
const apiUserRouter = require('./api/user');

router.use('/posts', apiPostsRouter);
router.use('/user', apiUserRouter);

module.exports = router;
