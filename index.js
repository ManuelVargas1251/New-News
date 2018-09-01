const
    // Files
    searching = require('./app/searching'),
    request = require('request'),
    config = require('./config'),

    // API Parameters
    apiKey = config.apiKey,
    channelId = config.channelId,
    youtubeApiUrl = "https://www.googleapis.com/youtube/v3/activities",
    options = "maxResults=5&part=snippet,contentDetails",
    YOUTUBEAPISTRING = youtubeApiUrl + '?' + 'key=' + apiKey + '&' + 'channelId=' + channelId + '&' + options


console.log("----Program starting----")




// Request the most recent video from the white house
//GET Request
request(

    // API URL
    YOUTUBEAPISTRING,

    // Response Format
    { json: true },

    // Response Callback
    (err, res, body, ) => {

        // prints any errors and returns
        if (err) { return console.log(err); }

        // handle the response body in a function below
        searching(body)
    }
)
