const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const path = require('path');
const mongoURI =
  'mongodb://chakapega:chakapegacrowdfunding@cluster0-shard-00-00-iytq9.azure.mongodb.net:27017,cluster0-shard-00-01-iytq9.azure.mongodb.net:27017,cluster0-shard-00-02-iytq9.azure.mongodb.net:27017/app?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/tag.routes'));
app.use('/api', require('./routes/project.routes'));
app.use('/api', require('./routes/user.routes'));

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
