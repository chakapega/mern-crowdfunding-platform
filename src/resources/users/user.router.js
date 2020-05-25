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

userRouter.post('/block-user', async (request, response) => {
  try {
    const { uid } = request.body;
    const user = await User.findOne({ uid });

    if (user.status === 'active') {
      user.status = 'blocked';
    } else if (user.status === 'blocked') {
      user.status = 'active';
    }
    await user.save();

    const users = await User.find();

    response.status(200).json({ message: 'User assigned by admin', users });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

module.exports = userRouter;
