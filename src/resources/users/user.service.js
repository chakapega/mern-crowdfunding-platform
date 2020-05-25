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

module.exports = { getByUid, getAll, create, update, addPaidBonus };
