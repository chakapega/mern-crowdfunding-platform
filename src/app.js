const express = require('express');
const app = express();
const { NODE_ENV } = require('./common/config');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const authorizationRouter = require('./resources/authorization/authorization.router');
const tagRouter = require('./resources/tags/tag.router');
const projectRouter = require('./resources/projects/project.router');
const searchRouter = require('./resources/search/search.router');
const userRouter = require('./resources/users/user.router');

app.use(express.json());

app.use('/api', authorizationRouter);
app.use('/api', tagRouter);
app.use('/api', projectRouter);
app.use('/api', searchRouter);
app.use('/api', userRouter);

app.use(errorHandler);

if (NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
