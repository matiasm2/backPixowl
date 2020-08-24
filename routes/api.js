/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();

const apiImageRouter = require('./api/image');
const apiPostsRouter = require('./api/posts');
const apiUserRouter = require('./api/user');

router.use('/image', apiImageRouter);
router.use('/posts', apiPostsRouter);
router.use('/user', apiUserRouter);

module.exports = router;
