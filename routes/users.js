const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/', [
  body('name', 'Please provide a name')
    .not()
    .isEmpty(),
  body('email', 'Please include a valid email')
    .isEmail(),
  body('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});

module.exports = router;