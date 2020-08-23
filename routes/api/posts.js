/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');



const {User} = require('../../database/models/index');

router.all('/', validateToken);

router.post('/create', async function(req, res, next) {
  const user = await User.findOne({where: {
    email: req.body.email,
  }});

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWTKEY);

    res.send({token: token});
  } else {
    res.json({error: 'User or password was invalid'});
  }
});


function validateToken(req, res, next) {
  const bearer = req.headers['authorization'];
  if (typeof bearer !== 'undefined') {
    req.token = bearer.split(' ')[1];
    try{
      jwt.validateToken(req.token, process.env.JWTKEY);
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
