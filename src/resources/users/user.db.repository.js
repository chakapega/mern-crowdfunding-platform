const User = require('./user.model');

const getByUid = uid => User.findOne({ uid });

const create = userData => User.create(userData);

module.exports = { getByUid, create };
