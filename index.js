const
    // Files
    searching = require('./app/searching'),
    request = require('request'),
    config = require('./config'),


    // API Parameters
    apiKey = config.apiKey,
    channelId = config.channelId,
    numberOfVideos = 10,
    youtubeApiUrl = "https://www.googleapis.com/youtube/v3/activities",
    options =
        'key=' + apiKey + '&' +
        'channelId=' + channelId + '&' +
        'maxResults=' + numberOfVideos + '&part=snippet,contentDetails',

    YOUTUBEAPISTRING = youtubeApiUrl + '?' + options

    console.log("----Program starting----")




//GET Request
// Request the most recent video from the white house
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
