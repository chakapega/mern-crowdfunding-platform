const { Schema, model } = require('mongoose');

const schema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  paidBonuses: { type: Array, required: true }
});

module.exports = model('User', schema);
