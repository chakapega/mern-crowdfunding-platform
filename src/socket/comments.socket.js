const io = require('socket.io');
const Comment = require('../../models/Comment');

const addSocketConnectionListener = server => {
  io(server).on('connection', socket => {
    socket.on('project id', async projectId => {
      const comments = await Comment.find({ projectId });

      socket.emit('comments', comments);
    });

    socket.on('comments', async data => {
      const {
        uid,
        email,
        displayName,
        photoURL,
        commentText,
        projectId,
        timeStamp,
      } = data;
      const comment = new Comment({
        uid,
        email,
        displayName,
        photoURL,
        commentText,
        projectId,
        timeStamp,
      });

      await comment.save();
      const comments = await Comment.find({ projectId });

      socket.emit('comments', comments);
      socket.broadcast.emit('comments', comments);
    });
  });
};

module.exports = addSocketConnectionListener;
