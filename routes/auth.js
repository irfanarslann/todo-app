const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AuthController = require('../controller/AuthController');
const { check } = require('express-validator');


//@router       POST api/auth/
//desc          Auth & Login
//access        Public
router.post(
  '/',
  [
    check('email', 'Field must be valid email').isEmail(),
    check('password', 'Password must be 6 or more charater').isLength({
      min: 6,
    }),
  ],
  AuthController.login
);

//@router       POST api/auth/
//desc          Get logged in user
//access        Private
router.get('/', auth, AuthController.getUser);

module.exports = router;
