const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));

app.post('/api/auth/login', async (request, response) => {
  try {
    const { email, uid } = request.body;
    const user = await User.findOne({ uid });

    if (!user) {
      const user = new User({
        email,
        uid
      });

      await user.save();
      response.status(201).json({ message: 'Ok' });
    }
  } catch (error) {
    response.status(500).json({
      message: 'An error occured, please try again'
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
