const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: { type: Number },
  id_str: { type: String},
  name: { type: String },
  screen_name: { type: String },
  location: { type: String },
  description: { type: String },
  url: { type: String },
  followers_count: { type: Number },
  friends_count: { type: Number },
  listed_count: { type: Number },
  created_at: { type: String },
  favourites_count: { type: Number },
  utc_offset: { type: String },
  time_zone: { type: String },
  geo_enabled: { type: Boolean },
  verified: { type: Boolean },
  statuses_count: { type: Number },
  lang: { type: String },
  contributors_enabled: { type: Boolean },
  profile_background_color: { type: String },
  profile_background_image_url: { type: String },
  profile_background_image_url_https: { type: String },
  profile_background_tile: { type: Boolean },
  profile_image_url: { type: String },
  profile_image_url_https: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = model('User', schema);
