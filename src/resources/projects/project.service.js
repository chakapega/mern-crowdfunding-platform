const projectDbRepository = require('./project.db.repository');
const userService = require('../users/user.service');

const create = projectData => projectDbRepository.create(projectData);

const update = projectData => projectDbRepository.update(projectData);

const addPaymentToProject = async paymentData => {
  const { id, paymentAmount, bonusInfo, uid } = paymentData;
  const project = await projectDbRepository.getById(id);

  project.fundsRaised += paymentAmount;
  await projectDbRepository.update(project);
  return await userService.addPaidBonus({
    uid,
    projectName: project.name,
    paymentAmount,
    bonusInfo,
  });
};

const getById = id => projectDbRepository.getById(id);

module.exports = { create, update, addPaymentToProject, getById };
