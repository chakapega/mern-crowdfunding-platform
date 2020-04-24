const { Schema, model } = require('mongoose');
const schema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  commentText: { type: String, required: true },
  projectId: { type: String, required: true },
  timeStamp: { type: String, required: true },
});

module.exports = model('Comment', schema);
