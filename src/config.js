const connection_uri = process.env.conn_uri;
const db = process.env.db;
const port = parseInt(process.env.port);
const consumer_key = process.env.consumer_key;
const consumer_secret = process.env.consumer_secret;
const bearer_token = process.env.bearer_token;

module.exports = {
  connection_uri,
  db,
  port,
  consumer_key,
  consumer_secret,
  bearer_token,
};
