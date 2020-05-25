const User = require('./user.model');

const getByUid = uid => User.findOne({ uid });

const getAll = () => User.find();

const create = userData => User.create(userData);

const update = userData => {
  const { uid } = userData;

  return User.updateOne({ uid }, userData);
};

module.exports = { getByUid, getAll, create, update };
