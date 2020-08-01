const mongoose = require('mongoose');

const config = require('../config');

mongoose
  .connect(config.connection_uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    dbName: config.db,
  })
  .then(() => console.log('MongoDB started'))
  .catch((err) => console.error(`MondoDB connnection error ${err}`));
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user'),
  TwitTracker: require('../models/twitTracker'),
  Counter: require('../models/counter'),
};
