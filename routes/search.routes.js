const { Router } = require('express');
const router = Router();
const Project = require('../models/Project');

router.post('/search', async (request, response) => {
  try {
    const { searchText } = request.body;
    const projects = await Project.find({ $text: { $search: searchText } });

    response.status(200).json({ message: 'Search result', projects });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

module.exports = router;
