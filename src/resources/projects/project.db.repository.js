const Project = require('./project.model');

const create = projectData => Project.create(projectData);

module.exports = { create };
