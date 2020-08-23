/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');



const {Like, Post, User} = require('../../database/models/index');

router.all('/', validateToken);

router.get('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {

});

router.post('/', async function(req, res, next) {
  try {

    const post = await Post.create(req.body);
    post.creator = await User.findByPk(req.sessionData.id);
    post.save();
    res.send(post);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});


function validateToken(req, res, next) {
  const bearer = req.headers['authorization'];
  if (typeof bearer !== 'undefined') {
    req.token = bearer.split(' ')[1];
    try{
      req.sessionData = jwt.verify(req.token, process.env.JWTKEY);

    } catch(err) {
      console.log(err);
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }

  next();

};

module.exports = router;
