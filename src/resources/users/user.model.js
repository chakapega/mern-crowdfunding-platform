const { Schema, model } = require('mongoose');

const User = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  paidBonuses: { type: Array, default: [], required: true },
  role: { type: String, default: 'user', required: true },
  status: { type: String, default: 'active', required: true },
});

module.exports = model('User', User);
