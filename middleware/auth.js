const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({ msg: 'No token! Authorization denied' });

  const decoded = jsonwebtoken.verify(token, config.get('jwtSecret'));

  req.user = decoded.user;
  next();
};
