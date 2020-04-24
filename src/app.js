const express = require('express');
const app = express();
// const io = require('socket.io')(server);
// const Comment = require('../models/Comment');

app.use(express.json());

app.use('/api', require('../routes/auth.routes'));
app.use('/api', require('../routes/tag.routes'));
app.use('/api', require('../routes/project.routes'));
app.use('/api', require('../routes/user.routes'));
app.use('/api', require('../routes/search.routes'));

// io.on('connection', (socket) => {
//   socket.on('project id', async (projectId) => {
//     const comments = await Comment.find({ projectId });

//     socket.emit('comments', comments);
//   });

//   socket.on('comments', async (data) => {
//     const {
//       uid,
//       email,
//       displayName,
//       photoURL,
//       commentText,
//       projectId,
//       timeStamp,
//     } = data;
//     const comment = new Comment({
//       uid,
//       email,
//       displayName,
//       photoURL,
//       commentText,
//       projectId,
//       timeStamp,
//     });

//     await comment.save();
//     const comments = await Comment.find({ projectId });

//     socket.emit('comments', comments);
//     socket.broadcast.emit('comments', comments);
//   });
// });

module.exports = app;
