## To run the app

In order to run the app firstly provide the environmental variables listed in the config file.
Then just do **npm start** or **node src/app.js** whichever you like.

## API Token

To get bearer token from Twitter API do
curl -u 'API key:API secret key' \\
--data 'grant_type=client_credentials' \\
'https://api.twitter.com/oauth2/token'

Be sure to replace API key and API secret key with your alphanumeric consumer API key and API secret key.

## To get count and add a new topic

For getting twits count per day go a **GET** request to the *'/count'* path.
To add a new topic do a **POST** request to the *'/topic'* path providing a new topic in the body of the request.
