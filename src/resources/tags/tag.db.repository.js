const Tag = require('./tag.model');

const getAll = () => Tag.find();

const create = async (tags, projectId) => {
  for (const tag of tags) {
    await Tag.create({
      value: tag,
      count: parseInt(Math.random() * (16 - 1) + 1),
      projectId,
    });
  }
};

module.exports = { getAll, create };
