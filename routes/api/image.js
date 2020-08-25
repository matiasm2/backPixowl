/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
'use strict';

const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares');


router.get('/:imageName', validateToken, function(req, res, next) {
  const imagePath = `${__dirname}/../../uploads/${req.params.imageName}`;
  res.download(imagePath, req.params.imageName, (err) => {
    if (err) {
      if (err.message.indexOf('no such file or directory') != -1) {
        res.status(404).json({error: 'Image not found'});
      } else {
        console.log(err.message);
        res.sendStatus(500);
      }
    }
  });
});

module.exports = router;
