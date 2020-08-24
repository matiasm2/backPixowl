/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const {User} = require('../../database/models/index');

router.post('/login', async function(req, res, next) {
  const user = await User.findOne({where: {
    email: req.body.email,
  }});

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({
      UserId: user.id,
      email: user.email,
    }, process.env.JWTKEY, {expiresIn: '10m'});

    res.send({token: token});
  } else {
    res.json({error: 'User or password was invalid'});
  }
});

router.post('/register', [
  check('email', 'The email is wrong').isEmail(),
  check('password', 'The password is mandatory').not().isEmpty(),
], async function(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  try {
    await User.create(req.body);
    res.send('User was created!');
  } catch (err) {
    const errors = [];
    err.errors.forEach((error) => {
      errors.push(error.message);
    });
    console.log(errors);
    res.json({errors});
  };
});

module.exports = router;
