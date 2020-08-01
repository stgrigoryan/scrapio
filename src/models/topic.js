const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    topics: { type: Array },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });

module.exports = model('Topic', schema);
