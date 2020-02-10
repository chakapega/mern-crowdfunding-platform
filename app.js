const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Comment = require('./models/Comment');
const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));

app.post('/api/auth', async (request, response) => {
  try {
    const { uid, email, displayName } = request.body;
    const user = await User.findOne({ uid });

    if (!user) {
      const user = new User({
        uid,
        email,
        displayName
      });

      await user.save();
      response.status(200).json({ message: 'Account added to database' });
    } else {
      response.status(200).json({ message: 'The account exists in the database' });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

app.post('/api/create-project', async (request, response) => {
  try {
    const {
      uid,
      email,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
      imageLinks
    } = request.body;
    const project = new Project({
      uid,
      email,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
      imageLinks
    });

    await project.save();
    response.status(200).json({ message: 'Project created' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

app.post('/api/create-comment', async (request, response) => {
  try {
    const { uid, email, displayName, photoURL, commentText, projectId, timeStamp } = request.body;
    const comment = new Comment({
      uid,
      email,
      displayName,
      photoURL,
      commentText,
      projectId,
      timeStamp
    });

    await comment.save();
    response.status(200).json({ message: 'Comment created' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

app.get('/api/projects', async (request, response) => {
  try {
    const projects = await Project.find();

    response.status(200).json(projects);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

app.get('/api/project/:id', async (request, response) => {
  try {
    const projectId = request.params.id;
    const project = await Project.findById(projectId);

    response.status(200).json(project);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log('App started, port: ', PORT));
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
}

start();
