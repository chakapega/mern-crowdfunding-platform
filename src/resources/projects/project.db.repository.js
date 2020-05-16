const Project = require('./project.model');

const create = projectData => Project.create(projectData);

const update = projectData => {
  const { _id } = projectData;

  return Project.updateOne({ _id }, projectData);
};

const getById = id => Project.findById(id);

module.exports = { create, update, getById };
