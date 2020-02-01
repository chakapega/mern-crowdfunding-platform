const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');

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
      response.status(201).json({ message: 'Account added to database' });
    } else {
      response.status(200).json({ message: 'The account exists in the database' });
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
