const tagDbRepository = require('./tag.db.repository');

const getAll = () => tagDbRepository.getAll();

module.exports = { getAll };
