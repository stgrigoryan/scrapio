const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    id_str: { type: String },
    start: { type: Date },
    isFinished: { type: Boolean },
    count: { type: Number },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });

module.exports = model('TwitTracker', schema);
