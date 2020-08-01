const express = require('express');
const mongo = require('./db/mongo');
const bodyParser = require('body-parser');

const { getTweets } = require('./jobs/getTweets');
const Topic = require('./models/topic');
const routes = require('./routes/general');
const { port } = require('./config');
const { eventEmitter } = require('./controllers/general');
const { onInitialRun } = require('./utils');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', routes);

app.listen(port, console.log(`Server started on port: ${port}`));

(async () => {
  try {
    await onInitialRun();

    const existTopics = await Topic.find();

    const topics = existTopics[0].topics;

    for (let i = 0; i < topics.length; ++i) {
      await getTweets(topics[i]);
    }

    eventEmitter.on('newTopic', (topic) => {
      console.log('Got a new topic', topic);
      getTweets(topic);
    });
  } catch (error) {
    console.error('error', error);
  }
})();
