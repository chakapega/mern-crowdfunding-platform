const userDbRepository = require('./user.db.repository');

const getByUid = uid => userDbRepository.getByUid(uid);

const getAll = () => userDbRepository.getAll();

const create = userData => userDbRepository.create(userData);

const update = userData => userDbRepository.update(userData);

const addPaidBonus = async paidBonusData => {
  const { uid, projectName, paymentAmount, bonusInfo } = paidBonusData;
  const user = await getByUid(uid);

  user.paidBonuses.push({
    projectName,
    paymentAmount,
    bonusInfo,
  });

  return userDbRepository.update(user);
};

const makeUserAdmin = userData => userDbRepository.makeUserAdmin(userData);

const blockUser = userData => userDbRepository.blockUser(userData);

module.exports = {
  getByUid,
  getAll,
  create,
  update,
  addPaidBonus,
  makeUserAdmin,
  blockUser,
};
