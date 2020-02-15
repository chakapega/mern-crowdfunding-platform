const { Schema, model } = require('mongoose');

const schema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: Array, required: true },
  fundraisingEndDate: { type: String, required: true },
  fundsRaised: { type: Number, required: true },
  target: { type: String, required: true },
  bonusTen: { type: String, required: true },
  bonusTwentyFive: { type: String, required: true },
  bonusFifty: { type: String, required: true },
  video: { type: String, required: true },
  imageLinks: { type: Array, required: true }
});

module.exports = model('Project', schema);
