const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  displayName: { type: String, required: true }
});

module.exports = model('User', schema);
