const tagRouter = require('express').Router();
const catchError = require('../../common/catchError');
const tagService = require('../tags/tag.service');
const { OK } = require('http-status-codes');

tagRouter.route('/tags').get(
  catchError(async (req, res) => {
    const tags = await tagService.getAll();

    res.status(OK).json(tags);
  })
);

module.exports = tagRouter;
