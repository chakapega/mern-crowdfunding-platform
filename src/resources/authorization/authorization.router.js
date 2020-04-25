const authorizationRouter = require('express').Router();
const catchError = require('../../common/catchError');
const userService = require('../users/user.service');
const { OK } = require('http-status-codes');

authorizationRouter.route('/auth').post(
  catchError(async (req, res) => {
    const { uid, email, displayName } = req.body;
    const potentialUser = await userService.getByUid(uid);

    if (!potentialUser) {
      const user = await userService.create({ uid, email, displayName });

      res.status(OK).json({ user, message: 'Account added to database' });
    } else {
      res.status(OK).json({
        user: potentialUser,
        message: 'The account exists in the database',
      });
    }
  })
);

module.exports = authorizationRouter;
