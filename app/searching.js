let request = require('request');
const fs = require('fs');
const ytdl = require('ytdl-core');
var config = require('../config')


let youtubeApiUrl = "https://www.googleapis.com/youtube/v3/activities",
    apiKey = config.apiKey,
    channelId = config.channelId,
    options = "maxResults=1&part=snippet,contentDetails";

// simple truncate function https://stackoverflow.com/a/1199420/7298219
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

function searching() {
    // request most recent video from the white house
    request(
        youtubeApiUrl + '?' +
        'key=' + apiKey + '&' +
        'channelId=' + channelId + '&' +
        options,
        { json: true },
        (err, res, body, ) => {
            if (err) { return console.log(err); }
            let videoResponse = body.items[0],
                videoTitle = videoResponse.snippet.title,   //video title
                videoURL = videoResponse.contentDetails.upload.videoId;   //video URL

            console.log(
                "TimeStamp: " + new Date() + '\n' +
                "Video Title: " + videoTitle.trunc(50) + '\n' +
                "Video URL: " + videoURL
            );

            // search the title for Press Briefing
            // if found, download video
            // else, log title and date
            if (videoTitle.includes('Press Briefing')) {
                //download video
                ytdl('https://www.youtube.com/watch?v=' + videoURL)
                    .pipe(fs.createWriteStream('./downloads/' + videoTitle + '.mp4'));
            }
            else (
                console.warn('Most recent video does not contain Press Briefing')
            )
        }
    )
}

searching()