const TwiTracker = require('./models/twitTracker');
const Topic = require('./models/topic');

const returnSearchDate = () => {
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const searchDate = oneWeekAgo.toISOString().split('T');
  return searchDate[0];
};

const returnSearchPosition = async () => {
  const twitTracker = await TwiTracker.find();

  if (twitTracker.length) {
    for (let i = 0; i < twitTracker.length; ++i) {
      if (twitTracker[i].isFinished) {
        continue;
      }
      return {
        id: twitTracker[i]._id,
        id_str: twitTracker[i].id_str,
        start: twitTracker[i].start,
        count: twitTracker[i].count,
      };
    }
    return null;
  }
};

const onInitialRun = async () => {
  const topics = ['Led Zeppelin', 'Esports', 'Lady Gaga', 'Docker'];
  await Topic.create({ topics });
  return 'Topics created';
};

module.exports = {
  returnSearchDate,
  returnSearchPosition,
  onInitialRun,
};
