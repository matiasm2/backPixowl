/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const bearer = req.headers.authorization;
  if (typeof bearer !== 'undefined') {
    try {
      const token = bearer.split(' ')[1];
      req.sessionData = jwt.verify(token, process.env.JWTKEY);
      next();
    } catch (err) {
      console.log(err);
      res.status(403).json({error: err.message});
    }
  } else {
    res.status(403).json({error: 'missing token'});
  }
};

module.exports = {
  validateToken: validateToken,
};
