const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.post('/auth', async (request, response) => {
  try {
    const { uid, email, displayName } = request.body;
    const user = await User.findOne({ uid });

    if (!user) {
      const user = new User({
        uid,
        email,
        displayName,
        paidBonuses: [],
        role: 'user',
        status: 'active'
      });

      await user.save();
      response.status(200).json({ message: 'Account added to database', user });
    } else {
      response.status(200).json({ message: 'The account exists in the database', user });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

module.exports = router;
