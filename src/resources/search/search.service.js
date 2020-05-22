const projectsService = require('../projects/project.service');

const findProjectsBySearchText = searchText =>
  projectsService.findBySearchText(searchText);

module.exports = { findProjectsBySearchText };
