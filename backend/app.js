const restify = require('restify');
const errors = require('restify-errors');
const mongoose = require('mongoose');
const config = require('./config');
const feedback = require('./src/routes/feedback');
const employee = require('./src/routes/employee');
const manager = require('./src/routes/manager');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true },
  );
});

const db = mongoose.connection;

db.on('error', err => new errors.InternalError(err));

db.once('open', () => {
  feedback(server);
  employee(server);
  manager(server);
});
