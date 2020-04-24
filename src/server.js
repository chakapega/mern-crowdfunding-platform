const dbClient = require('./db/db.client');
const app = require('./app');
const server = require('http').Server(app);
const { MONGO_CONNECTION_STRING, PORT } = require('./common/config');

dbClient.connect(MONGO_CONNECTION_STRING, () => {
  server.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
