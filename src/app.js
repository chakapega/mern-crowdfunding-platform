const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const authorizationRouter = require('./resources/authorization/authorization.router');

app.use(express.json());

app.use('/api', authorizationRouter);
app.use('/api', require('../routes/tag.routes'));
app.use('/api', require('../routes/project.routes'));
app.use('/api', require('../routes/user.routes'));
app.use('/api', require('../routes/search.routes'));

app.use(errorHandler);

module.exports = app;
