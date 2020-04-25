const userDbRepository = require('./user.db.repository');

const getByUid = uid => userDbRepository.getByUid(uid);

const create = userData => userDbRepository.create(userData);

module.exports = { getByUid, create };
