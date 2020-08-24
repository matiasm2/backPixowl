/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares');
const {check, validationResult} = require('express-validator');
const {Like, Post} = require('../../database/models/index');

router.all('/', validateToken);
router.all('/like', validateToken);

router.get('/', async function(req, res, next) {
  try {
    const posts = await Post.findAll();
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const post = await Post.findByPk(req.params.id);
    const user = await post.getUser();
    const likes = await Like.count({where: {
      PostId: post.id,
      active: true,
    }});
    res.json({
      user: user.email,
      image: post.image,
      description: post.description,
      likes: likes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }
});

router.post('/', [
  check('image', 'The image is mandatory').not().isEmpty(),
  check('image', 'The image must have a data uri format').isDataURI(),
], async function(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    req.body.UserId = req.sessionData.UserId;
    const post = await Post.create(req.body);
    post.save();
    res.send(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/like', async function(req, res, next) {
  try {
    if (!req.body.PostId) {
      res.status(400).json({error: 'PostId is required'});
    }

    const [like, isNewRecord] = await Like.findOrCreate({
      where: {
        PostId: req.body.PostId,
        UserId: req.sessionData.UserId,
      },
      defaults: {
        active: true,
      }});

    if (!isNewRecord) {
      like.active = !like.active;
      like.save();
    }

    res.send(like);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
