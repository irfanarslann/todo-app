const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const { check } = require('express-validator');

//@router       POST api/auth/
//desc          Register new user
//access        Public
router.post(
  '/',
  [
    check('email', 'Field must be valid email').isEmail(),
    check('password', 'Password must be 6 or more charater').isLength({
      min: 6,
    }),
    check('username', 'Field must be valid email').exists(),
  ],
  UserController.register
);

module.exports = router;
