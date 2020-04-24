const mongoose = require('mongoose');

const connect = (MONGO_CONNECTION_STRING, cb) => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(async () => {
      console.log('MongoDB connected');
      cb();
    })
    .catch(() => {
      process.exitCode = 1;
    });
};

module.exports = { connect };
