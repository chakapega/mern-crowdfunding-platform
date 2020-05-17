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

const changeProjectRating = async projectRatingData => {
  const { id, uid, value } = projectRatingData;
  const project = await getById(id);
  let isUserRating = false;

  project.ratings.forEach(rating => {
    if (rating.uid === uid) {
      isUserRating = true;
    }
  });

  if (!isUserRating) {
    project.ratings.push({
      id,
      uid,
      value,
    });
  } else {
    project.ratings.forEach(rating => {
      if (rating.uid === uid) {
        rating.value = value;
      }
    });
  }

  return await update(project);
};

module.exports = {
  create,
  update,
  addPaymentToProject,
  getById,
  changeProjectRating,
};
