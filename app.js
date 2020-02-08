const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');
const Created_project = require('./models/Created_project');

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

    const createdProject = new Created_project({
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

    await createdProject.save();
    response.status(200).json({ message: 'Project created' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

app.get('/api/projects', async (request, response) => {
  try {
    const projects = await Created_project.find();

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
    const project = await Created_project.findById(projectId);

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
