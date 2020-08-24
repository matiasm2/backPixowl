/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');
const multer = require('multer');

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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    console.log('err');
    req.errorMessage = 'The file must be jpeg or png';
    cb(new Error('The file must be jpeg or png'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = {
  validateToken: validateToken,
  upload: upload,
};
