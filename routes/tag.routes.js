const { Router } = require('express');
const router = Router();
const Tag = require('../models/Tag');

router.get('/tags', async (request, response) => {
  try {
    const tags = await Tag.find();

    response.status(200).json(tags);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

module.exports = router;
