const { Schema, model } = require('mongoose');

const schema = new Schema({
  count: { type: Number },
  createdAt: { type: Date, default: Date.now, index: { expires: 880 } }
});

schema.set('toJSON', { virtuals: true });

module.exports = model('Counter', schema);