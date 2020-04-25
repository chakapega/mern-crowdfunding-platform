const dbClient = require('./db/db.client');
const app = require('./app');
const server = require('http').Server(app);
const addSocketConnectionListener = require('./socket/comments.socket');
const { MONGO_CONNECTION_STRING, PORT } = require('./common/config');

addSocketConnectionListener(server);

dbClient.connect(MONGO_CONNECTION_STRING, () => {
  server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
});

module.exports = server;
