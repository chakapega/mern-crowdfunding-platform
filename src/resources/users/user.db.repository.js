const User = require('./user.model');

const getByUid = uid => User.findOne({ uid });

const getAll = () => User.find();

const create = userData => User.create(userData);

const update = userData => {
  const { uid } = userData;

  return User.updateOne({ uid }, userData);
};

const makeUserAdmin = userData => {
  const { uid } = userData;

  return User.updateOne({ uid }, { role: 'admin' });
};

const blockUser = async userData => {
  const { uid, status } = userData;

  if (status === 'active') {
    return User.updateOne({ uid }, { status: 'blocked' });
  } else if (status === 'blocked') {
    return User.updateOne({ uid }, { status: 'active' });
  }
};

module.exports = {
  getByUid,
  getAll,
  create,
  update,
  makeUserAdmin,
  blockUser,
};
