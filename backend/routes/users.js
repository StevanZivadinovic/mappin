const usersRoutes = require('express').Router();
const { handleErrors } = require('../hlperFunctions/helperFunctions.js');
const { requireAuth } = require('../middleware/authMiddleware.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const jwtSecret = process.env.JWT_SECRET;
const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: maxAge,
    // Note: The cookie option should be provided separately, not inside jwt.sign options
    // Set the attributes of the cookie
    cookie: {
      secure: true, // Set to 'true' in production for HTTPS connections
      sameSite: 'None', // Set to 'None' for cross-site requests
      httpOnly: true, // Set to 'true' to prevent client-side JavaScript from accessing the cookie
      domain: '.onrender.com', // Set the 'Domain' attribute to '.onrender.com' for cross-subdomain cookies
      path: '/', // Set the 'Path' attribute to '/' to make the cookie valid for all paths
    }
  });
};

usersRoutes.post('/register_new_user', async (req, res) => {
  try {
    // Check if a user with the requested email already exists
    const existingUser = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (existingUser) {
      const errors = handleErrors({ message: req.t('already_in_use') });
      return res.status(400).json(errors);
    }
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const newUserAdded = await newUser.save();
    const token = createToken(newUserAdded._id);
    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.onrender.com', // Adjust the domain as needed
      path: '/', // Adjust the path as needed
      maxAge: maxAge
     });
    return res
      .status(200)
      .json({
        message: req.t('user_registered_successfully'),
        user: newUserAdded._id,
        userData: newUserAdded,
        loggedIn: true,
      });
  } catch (err) {
    const errors = handleErrors(err, req.t);
    return res.status(400).json(errors);
  }
});

usersRoutes.post('/login', (req, res) => {
  console.log(req.body)
  User.findOne({ username: req.body.username })
    .then((data) => {
      console.log(data, 'moze')
      if (!data) {
        const errors = handleErrors(
          { message: req.t('user_not_found') },
          req.t
        );
        return res.status(400).json(errors);
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      if (!validPassword) {
        const errors = handleErrors(
          { message: req.t('wrong_username_or_password') },
          req.t
        );
        return res.status(400).json(errors);
      }
      const token = createToken(data._id);
      res.cookie('jwt', token, { 
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        domain: '.onrender.com', // Adjust the domain as needed
        path: '/', // Adjust the path as needed
        maxAge: maxAge
      });
      res
        .status(200)
        .json({
          message: req.t('user_logged_in_successfully'),
          user: data._id,
          userData: data,
          loggedIn: true,
        });
    })
    .catch((err) => {
      const errors = handleErrors(err, req.t);
      console.log('haj')
      res.status(500).json({ errors, loggedIn: false, token:'sadsd' });
    });
});
usersRoutes.get('/logout', (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, maxAge: 0 });
  res
    .status(200)
    .json({ message: req.t('user_logged_out_successfully'), user: null });
});

usersRoutes.get('/', requireAuth, (req, res) => {
  if (res.loggedIn) {
    res
      .status(200)
      .json({
        message: req.t('user_logged_out_successfully'),
        loggedIn: res.loggedIn,
        user: res.user,
      });
  } else {
    res
      .status(200)
      .json({
        message: req.t('user_is_not_logged_in'),
        loggedIn: res.loggedIn,
        user: res.user,
      });
  }
});

module.exports = usersRoutes;
