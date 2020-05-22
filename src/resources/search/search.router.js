const searchRouter = require('express').Router();
const catchError = require('../../common/catchError');
const searchService = require('./search.service');
const { OK } = require('http-status-codes');

searchRouter.route('/search').post(
  catchError(async (req, res) => {
    const { searchText } = req.body;
    const projects = await searchService.findProjectsBySearchText(searchText);

    res.status(OK).json({ message: 'Search result', projects });
  })
);

module.exports = searchRouter;
