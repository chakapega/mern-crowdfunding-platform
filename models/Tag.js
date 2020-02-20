const { Schema, model } = require('mongoose');

const schema = new Schema({
  value: { type: String, required: true },
  count: { type: Number, required: true },
  projectId: { type: String, required: true }
});

module.exports = model('Tag', schema);
