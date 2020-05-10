const Tag = require('./tag.model');

const getAll = () => Tag.find();

module.exports = { getAll };
