/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const {validateToken, upload} = require('../middlewares');
const {Like, Post} = require('../../database/models/index');

router.all('/', validateToken);
router.all('/like', validateToken);

router.get('/', async function(req, res, next) {
  try {
    let {page = 0, pageSize = 25} = req.query;
    page = parseInt(page)-1;
    pageSize = parseInt(pageSize);
    const paginate = async ({page, pageSize}) => {
      console.log('ENTROOO');
      const postsAmmount = await Post.count();
      let offset = page * pageSize;
      if (offset > postsAmmount) {
        offset = 0;
      }
      const limit = pageSize;

      return {
        offset,
        limit,
      };
    };
    const posts = await Post.findAndCountAll({
      ...await paginate({page, pageSize}),
      order: [
        ['updatedAt', 'DESC'],
      ],
      attributes: [
        `id`,
        `image`,
        `description`,
        `createdAt`,
      ],
    },
    );
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({error: 'Post not found'});
    } else {
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
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }
});

router.post('/', upload.single('image'), async function(req, res, next) {
  if (req.errorMessage) {
    res.status(400).json({error: req.errorMessage});
  }
  try {
    req.body.UserId = req.sessionData.UserId;
    req.body.image = `${req.headers.host}/api/image/${req.file.filename}`;
    const post = await Post.create(req.body);
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
