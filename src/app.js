const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const authorizationRouter = require('./resources/authorization/authorization.router');
const tagRouter = require('./resources/tags/tag.router');
const projectRouter = require('./resources/projects/project.router');
const searchRouter = require('./resources/search/search.router');

app.use(express.json());

app.use('/api', authorizationRouter);
app.use('/api', tagRouter);
app.use('/api', projectRouter);
app.use('/api', searchRouter);
app.use('/api', require('../routes/user.routes'));

app.use(errorHandler);

module.exports = app;
