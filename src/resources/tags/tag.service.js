const tagDbRepository = require('./tag.db.repository');

const getAll = () => tagDbRepository.getAll();

const create = (tags, projectId) => tagDbRepository.create(tags, projectId);

module.exports = { getAll, create };
