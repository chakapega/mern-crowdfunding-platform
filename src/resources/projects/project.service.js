const projectDbRepository = require('./project.db.repository');

const create = projectData => projectDbRepository.create(projectData);

const update = projectData => projectDbRepository.update(projectData);

module.exports = { create, update };
