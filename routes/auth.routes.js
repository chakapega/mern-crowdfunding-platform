const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Must be at least six characters').isLength({ min: 6 })
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        });
      }
      const { email, password } = request.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        response.status(400).json({ message: 'This user already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword
      });

      await user.save();
      response.status(201).json({ message: 'User created' });
    } catch (error) {
      response.status(500).json({
        message: 'An error occured, please try again'
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login details'
        });
      }

      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: 'User is not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({ message: 'Invalid password, try again' });
      }

      response.json({ token, userId: user.id });

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
    } catch (error) {
      response.status(500).json({
        message: 'An error occured, please try again'
      });
    }
  }
);

module.exports = router;
