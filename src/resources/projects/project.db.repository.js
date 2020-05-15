const Project = require('./project.model');

const create = projectData => Project.create(projectData);

const update = projectData => {
  const { _id } = projectData;

  return Project.updateOne({ _id }, projectData);
};

module.exports = { create, update };
