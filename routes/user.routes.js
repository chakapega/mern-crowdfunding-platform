const { Router } = require('express');
const router = Router();
const User = require('../src/resources/users/user.model');

router.get('/user/:id', async (request, response) => {
  try {
    const {
      params: { id: uid },
    } = request;
    const user = await User.findOne({ uid });

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

router.get('/users', async (request, response) => {
  try {
    const users = await User.find();

    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

router.post('/make-user-admin', async (request, response) => {
  try {
    const { uid } = request.body;
    const user = await User.findOne({ uid });

    user.role = 'admin';
    await user.save();

    const users = await User.find();

    response.status(200).json({ message: 'User assigned by admin', users });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

router.post('/block-user', async (request, response) => {
  try {
    const { uid } = request.body;
    const user = await User.findOne({ uid });

    if (user.status === 'active') {
      user.status = 'blocked';
    } else if (user.status === 'blocked') {
      user.status = 'active';
    }
    await user.save();

    const users = await User.find();

    response.status(200).json({ message: 'User assigned by admin', users });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

module.exports = router;
