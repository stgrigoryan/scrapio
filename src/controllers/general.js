const events = require('events');
const eventEmitter = new events.EventEmitter();

const TwiTracker = require('../models/twitTracker');
const Topic = require('../models/topic');

const getTwitCount = async () => {
  const twits = await TwiTracker.find();
  let twitsCount = [];
  if (twits.length) {
    for (let i = 0; i < twits.length; ++i) {
      twitsCount.push({
        date: twits[i].start,
        count: twits[i].count,
      });
    }
    return twitsCount;
  } else {
    throw {
      status: 404,
      message: 'Twits count not found',
    };
  }
};

const addNewTopic = async (topic) => {
  const existingTopic = await Topic.findOne();
  if (existingTopic) {
    existingTopic.topics.map((t) => {
      if (t === topic) {
        throw {
          status: 400,
          message: 'Topic already exists',
        };
      }
    });
    await Topic.findByIdAndUpdate(
      { _id: existingTopic._id },
      { $push: { topics: topic } }
    );
    eventEmitter.emit('newTopic', 'bharat');
  } else {
    throw {
      status: 404,
      message: 'Topics not found',
    };
  }
};

module.exports = {
  getTwitCount,
  addNewTopic,
  eventEmitter,
};
