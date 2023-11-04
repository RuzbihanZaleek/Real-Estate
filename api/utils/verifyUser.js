const errorHandler = require('./errorHandler.utils');
const jwtToken = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwtToken.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user; //user id
    next();
  });
};

module.exports = { verifyUser };
