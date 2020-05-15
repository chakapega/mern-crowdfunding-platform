const projectRouter = require('express').Router();
const catchError = require('../../common/catchError');
const { OK } = require('http-status-codes');
const projectService = require('./project.service');
const tagService = require('../tags/tag.service');
const Project = require('./project.model');
const User = require('../users/user.model');
const Tag = require('../tags/tag.model');

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

projectRouter.post('/project-pay', async (request, response) => {
  try {
    const { id, paymentAmount, bonusInfo, uid } = request.body;
    const project = await Project.findById(id);

    project.fundsRaised += paymentAmount;
    await project.save();
    const user = await User.findOne({ uid });
    user.paidBonuses.push({
      projectName: project.name,
      paymentAmount,
      bonusInfo,
    });
    await user.save();
    response
      .status(200)
      .json({ message: 'Payment made', fundsRaised: project.fundsRaised });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

projectRouter.post('/project-change-rating', async (request, response) => {
  try {
    const { id, uid, value } = request.body;
    const project = await Project.findById(id);
    let isUserRating = false;

    project.ratings.forEach(rating => {
      if (rating.uid === uid) {
        isUserRating = true;
      }
    });
    if (!isUserRating) {
      project.ratings.push({
        id,
        uid,
        value,
      });
    } else {
      project.ratings.forEach(rating => {
        if (rating.uid === uid) {
          rating.value = value;
        }
      });
    }
    project.markModified('ratings');
    await project.save();
    response
      .status(200)
      .json({ message: 'Rating changed', ratings: project.ratings });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

projectRouter.post('/delete-project', async (request, response) => {
  try {
    const { _id } = request.body;

    await Project.deleteOne({ _id });
    await Tag.deleteMany({ projectId: _id });

    response.status(200).json({ message: 'Project and tags deleted' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

projectRouter.route('/projects').get(
  catchError(async (req, res) => {
    const projects = await Project.find();

    res.status(200).json(projects);
  })
);

projectRouter.get('/project/:id', async (request, response) => {
  try {
    const {
      params: { id },
    } = request;
    const project = await Project.findById(id);

    response.status(200).json(project);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

projectRouter.get('/projects/user/:id', async (request, response) => {
  try {
    const {
      params: { id: uid },
    } = request;
    const projects = await Project.find({ uid });

    response.status(200).json(projects);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again',
    });
  }
});

module.exports = projectRouter;
