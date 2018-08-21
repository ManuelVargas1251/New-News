// main app start file

const
    // Imports
    request = require('request'),
    ytdl = require('ytdl-core'),
    config = require('../config'),
    fs = require('fs'),

    // API Parameters
    apiKey = config.apiKey,
    channelId = config.channelId,
    youtubeApiUrl = "https://www.googleapis.com/youtube/v3/activities",
    options = "maxResults=1&part=snippet,contentDetails",
    youtubeapistring = youtubeApiUrl + '?' + 'key=' + apiKey + '&' + 'channelId=' + channelId + '&' + options



// String Truncate function; source: https://stackoverflow.com/a/1199420/7298219
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

// Request the most recent video from the white house
function searching() {
    request(
        youtubeapistring,
        { json: true },
        (err, res, body, ) => {
            if (err) { return console.log(err); }
            responseHandler(body)   // handle this in a function below
        }
    )
}

searching()


function responseHandler(body) {
    let videoResponse = body.items[0],
        videoTitle = videoResponse.snippet.title,                   //video title
        videoURL = videoResponse.contentDetails.upload.videoId,     //video URL
        currentDate = new Date().toISOString()
    stream = fs.createWriteStream('log.log',
        { flags: 'a' },
        (err) => {
            throw err;
        }
    );

    // log to file
    stream.write(currentDate + '  ' + videoURL + '  ' + videoTitle + '\n');

    // log to console
    console.log(
        "TimeStamp: " + currentDate + '\n' +
        "Video Title: " + videoTitle.trunc(45) + '\n' +
        "Video URL: " + videoURL
    )

    //if()

    // search the title for Press Briefing
    // if found, download video
    // else, log title and date
    if (videoTitle.includes('Press Briefing')) {

        //download video
        ytdl('https://www.youtube.com/watch?v=' + videoURL)     // Source Url
            .pipe(fs.createWriteStream('./downloads/' + videoTitle + '.mp4'));  // Destination Location
    }
    else (
        console.warn('Most recent video does not contain Press Briefing')
        // send me a text and wait for a response from me??
    )
}