const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const authorizationRouter = require('./resources/authorization/authorization.router');
const tagRouter = require('./resources/tags/tag.router');
const projectRouter = require('./resources/projects/project.router');

app.use(express.json());

app.use('/api', authorizationRouter);
app.use('/api', tagRouter);
app.use('/api', projectRouter);
app.use('/api', require('../routes/user.routes'));
app.use('/api', require('../routes/search.routes'));

app.use(errorHandler);

module.exports = app;
