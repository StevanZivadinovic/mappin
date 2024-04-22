const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const jwtSecret = process.env.JWT_SECRET;
  console.log('token',token);
  
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        req.loggedIn = false; // Set loggedIn status on req object
        next();
      } else {
        req.loggedIn = true; // Set loggedIn status on req object
        next();
      }
    });
  } else {
    req.loggedIn = false; // Set loggedIn status on req object
    next();
  }
};


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  const jwtSecret = process.env.JWT_SECRET;
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