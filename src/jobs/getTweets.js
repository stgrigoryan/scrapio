const Twitter = require('twitter');
const util = require('util');
const mongoose = require('mongoose');

const { consumer_key, consumer_secret, bearer_token } = require('../config');
const User = require('../models/user');
const Counter = require('../models/counter');
const TwiTracker = require('../models/twitTracker');

const { returnSearchDate, returnSearchPosition } = require('../utils');

const setTimeoutPromise = util.promisify(setTimeout);

const getTweets = async (topic, query) => {
  const startDate = returnSearchDate();
  let options = {
    q: `${topic} since:${startDate}`,
    result_type: 'recent',
    count: 100,
  };

  const searchPosition = await returnSearchPosition();

  if (searchPosition) {
    options.q = `${topic} since:${startDate}`;
    options.max_id = searchPosition.id_str;
  }

  const result = await Counter.find();
  if (!result[0]) {
    await Counter.create({
      count: 450,
    });
  } else if (result[0].count <= 0) {
    return;
  }

  const client = new Twitter({
    consumer_key,
    consumer_secret,
    bearer_token,
  });

  if (query) {
    options.max_id = query.split('&')[0].split('=')[1];
  }

  await setTimeoutPromise(1000);
  const data = await client.get('search/tweets', options);

  const counter = await Counter.find();
  if (counter && counter[0]) {
    --counter[0].count;
    await counter[0].save();
  } else {
    await Counter.create({
      count: 450,
    });
  }

  if (data) {
    for (let i = 0; i < data.statuses.length; ++i) {
      if (
        searchPosition &&
        searchPosition.start.getDate() > new Date(data.statuses[i].created_at).getDate()
      ) {
        await TwiTracker.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(searchPosition.id) },
          { isFinished: true }
        );
        await TwiTracker.create({
          id_str: data.statuses[i].id_str,
          start: data.statuses[i].created_at,
          count: 1,
        });
      } else if (searchPosition) {
        await TwiTracker.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(searchPosition.id) },
          { id_str: data.statuses[i].id_str, count: ++searchPosition.count }
        );
      } else {
        await TwiTracker.create({
          id_str: data.statuses[i].id_str,
          start: data.statuses[i].created_at,
          count: 1,
        });
      }

      const existingUser = await User.findOne({ id_str: data.statuses[i].user.id_str });
      if (existingUser) {
        continue;
      }
      await User.create(data.statuses[i].user);
    }

    if (data.search_metadata && data.search_metadata.next_results) {
      await getTweets(topic, data.search_metadata.next_results);
    } else {
      return;
    }
  }
};

module.exports = {
  getTweets,
};
