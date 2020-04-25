const express = require('express');
const app = express();

app.use(express.json());

app.use('/api', require('../routes/auth.routes'));
app.use('/api', require('../routes/tag.routes'));
app.use('/api', require('../routes/project.routes'));
app.use('/api', require('../routes/user.routes'));
app.use('/api', require('../routes/search.routes'));

module.exports = app;
