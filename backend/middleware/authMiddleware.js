const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const jwtSecret = 'sycret text of mine';
  console.log(token)
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.loggedIn=false;
        next();
      } else {
        res.loggedIn=true;
        next();
      }
    });
  } else {
    res.loggedIn=false;
    next();
  }
};


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  const jwtSecret = 'sycret text of mine';
  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        res.loggedIn=false;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.loggedIn=true;
        res.user = user;
        next();
      }
    });
  } else {
    res.user = null;
    res.loggedIn=false;
    next();
  }
};


module.exports = { requireAuth, checkUser };