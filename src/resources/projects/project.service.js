const projectDbRepository = require('./project.db.repository');

const create = projectData => projectDbRepository.create(projectData);

module.exports = { create };
