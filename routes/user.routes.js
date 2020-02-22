const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/user/:id', async (request, response) => {
  try {
    const {
      params: { id: uid }
    } = request;
    const user = await User.findOne({ uid });

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.get('/users', async (request, response) => {
  try {
    const users = await User.find();

    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

module.exports = router;
