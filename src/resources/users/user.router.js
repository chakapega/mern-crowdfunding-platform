const userRouter = require('express').Router();
const catchError = require('../../common/catchError');
const userService = require('./user.db.repository');
const User = require('./user.model');
const { OK, NOT_FOUND } = require('http-status-codes');

userRouter.route('/user/:id').get(
  catchError(async (req, res) => {
    const {
      params: { id: uid },
    } = req;
    const user = await userService.getByUid(uid);

    res.status(OK).json(user);
  })
);

userRouter.route('/users').get(
  catchError(async (req, res) => {
    const users = await userService.getAll();

    res.status(OK).json(users);
  })
);

userRouter.route('/make-user-admin').post(
  catchError(async (req, res) => {
    const { uid } = req.body;
    const potentialUser = await userService.getByUid(uid);

    if (potentialUser) {
      await userService.makeUserAdmin(potentialUser);

      const users = await userService.getAll();

      res.status(OK).json({ message: 'User assigned by admin', users });
    } else {
      res.status(NOT_FOUND).json({ message: 'User not found' });
    }
  })
);

userRouter.route('/block-user').post(
  catchError(async (req, res) => {
    const { uid } = req.body;
    const potentialUser = await userService.getByUid(uid);

    if (potentialUser) {
      await userService.blockUser(potentialUser);

      const users = await userService.getAll();

      res.status(OK).json({ message: 'User successfully blocked', users });
    } else {
      res.status(NOT_FOUND).json({ message: 'User not found' });
    }
  })
);

module.exports = userRouter;
