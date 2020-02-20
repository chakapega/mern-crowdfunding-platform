const { Router } = require('express');
const router = Router();
const Project = require('../models/Project');
const User = require('../models/User');

router.post('/create-project', async (request, response) => {
  try {
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
      imageLinks
    } = request.body;
    const project = new Project({
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
      imageLinks
    });

    await project.save();
    response.status(200).json({ message: 'Project created' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.post('/edit-project', async (request, response) => {
  try {
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
      video
    } = request.body;
    const project = await Project.findById(_id);

    project.name = name;
    project.description = description;
    project.category = category;
    project.tags = tags;
    project.fundraisingEndDate = fundraisingEndDate;
    project.target = target;
    project.bonusTen = bonusTen;
    project.bonusTwentyFive = bonusTwentyFive;
    project.bonusFifty = bonusFifty;
    project.video = video;

    await project.save();
    response.status(200).json({ message: 'Project edited' });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.post('/project-pay', async (request, response) => {
  try {
    const { id, paymentAmount, bonusInfo, uid } = request.body;

    const project = await Project.findById(id);
    project.fundsRaised += paymentAmount;
    await project.save();

    const user = await User.findOne({ uid });
    user.paidBonuses.push({ projectName: project.name, paymentAmount, bonusInfo });
    await user.save();

    response.status(200).json({ message: 'Payment made', fundsRaised: project.fundsRaised });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.post('/delete-project', async (request, response) => {
  try {
    const { _id } = request.body;

    Project.deleteOne({ _id }, error => {
      if (error) throw error;

      response.status(200).json({ message: 'Project deleted' });
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.get('/projects', async (request, response) => {
  try {
    const projects = await Project.find();

    response.status(200).json(projects);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.get('/project/:id', async (request, response) => {
  try {
    const {
      params: { id }
    } = request;
    const project = await Project.findById(id);

    response.status(200).json(project);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

router.get('/projects/user/:id', async (request, response) => {
  try {
    const {
      params: { id: uid }
    } = request;
    const projects = await Project.find({ uid });

    response.status(200).json(projects);
  } catch (error) {
    response.status(500).json({
      message: error.message || 'An error occured, please try again'
    });
  }
});

module.exports = router;
