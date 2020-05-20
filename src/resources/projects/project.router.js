const projectRouter = require('express').Router();
const catchError = require('../../common/catchError');
const { OK } = require('http-status-codes');
const projectService = require('./project.service');
const tagService = require('../tags/tag.service');

projectRouter.route('/create-project').post(
  catchError(async (req, res) => {
    const {
      uid,
      email,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      fundsRaised,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
      imageLinks,
    } = req.body;
    const project = await projectService.create({
      uid,
      email,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      fundsRaised,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
      imageLinks,
    });
    const { _id: projectId } = project;

    await tagService.create(tags, projectId);

    res.status(OK).json({ message: 'Project created' });
  })
);

projectRouter.route('/edit-project').put(
  catchError(async (req, res) => {
    const {
      _id,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
    } = req.body;
    await projectService.update({
      _id,
      name,
      description,
      category,
      tags,
      fundraisingEndDate,
      target,
      bonusTen,
      bonusTwentyFive,
      bonusFifty,
      video,
    });

    res.status(OK).json({ message: 'Project edited' });
  })
);

projectRouter.route('/project-pay').post(
  catchError(async (req, res) => {
    const { id, paymentAmount, bonusInfo, uid } = req.body;

    await projectService.addPaymentToProject({
      id,
      paymentAmount,
      bonusInfo,
      uid,
    });

    const project = await projectService.getById(id);

    res
      .status(OK)
      .json({ message: 'Payment made', fundsRaised: project.fundsRaised });
  })
);

projectRouter.route('/project-change-rating').post(
  catchError(async (req, res) => {
    const { id, uid, value } = req.body;

    await projectService.changeProjectRating({ id, uid, value });

    const project = await projectService.getById(id);

    res
      .status(OK)
      .json({ message: 'Rating changed', ratings: project.ratings });
  })
);

projectRouter.route('/delete-project').delete(
  catchError(async (req, res) => {
    const { _id } = req.body;

    await projectService.remove(_id);

    res.status(OK).json({ message: 'Project and tags deleted' });
  })
);

projectRouter.route('/projects').get(
  catchError(async (req, res) => {
    const projects = await projectService.getAll();

    res.status(OK).json(projects);
  })
);

projectRouter.route('/project/:id').get(
  catchError(async (req, res) => {
    const {
      params: { id },
    } = req;
    const project = await projectService.getById(id);

    res.status(OK).json(project);
  })
);

projectRouter.route('/projects/user/:id').get(
  catchError(async (req, res) => {
    const {
      params: { id: uid },
    } = req;
    const projects = await projectService.getByUserId(uid);

    res.status(OK).json(projects);
  })
);

module.exports = projectRouter;
