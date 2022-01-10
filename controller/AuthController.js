const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: ' Bad Credientals' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: ' Bad Credientals' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jsonwebtoken.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 60000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER Error');
  }
};
const getUser = async (req, res, next) => {
  try {
    const userItem = await User.findById(req.user.id).select('-password');
    res.json(userItem);
  } catch (error) {
    res.status(500).send('SERVER Error');
  }
};

module.exports = {
  login,

  getUser,
};
