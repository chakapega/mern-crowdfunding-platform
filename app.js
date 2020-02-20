const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('config');
const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const PORT = config.get('port');

app.use(express.json({ extended: true }));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/tag.routes'));
app.use('/api', require('./routes/project.routes'));
app.use('/api', require('./routes/user.routes'));

io.on('connection', socket => {
  socket.on('project id', async projectId => {
    const comments = await Comment.find({ projectId });

    socket.emit('comments', comments);
  });

  socket.on('comments', async data => {
    const { uid, email, displayName, photoURL, commentText, projectId, timeStamp } = data;
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
    const comments = await Comment.find({ projectId });

    socket.emit('comments', comments);
    socket.broadcast.emit('comments', comments);
  });
});

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    server.listen(PORT, () => console.log('App started, port: ', PORT));
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
}

start();
