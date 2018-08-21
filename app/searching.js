const request = require('request')
const ytdl = require('ytdl-core')
const config = require('../config')
const fs = require('fs')

// API Parameters
const apiKey = config.apiKey,
    channelId = config.channelId,
    youtubeApiUrl = "https://www.googleapis.com/youtube/v3/activities",
    options = "maxResults=1&part=snippet,contentDetails",
    youtubeapistring = youtubeApiUrl + '?' + 'key=' + apiKey + '&' + 'channelId=' + channelId + '&' + options



// simple truncate function https://stackoverflow.com/a/1199420/7298219
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };



function searching() {

    // request most recent video from the white house
    request(
        youtubeapistring,
        { json: true },
        (err, res, body, ) => {
            if (err) { return console.log(err); }

            let videoResponse = body.items[0],
                videoTitle = videoResponse.snippet.title,                   //video title
                videoURL = videoResponse.contentDetails.upload.videoId,     //video URL
                currentDate = new Date().toISOString()
                // stream = fs.createWriteStream('file://log.json',
                //     { flags: 'a' },

                // );

            //stream.write(currentDate+videoTitle );

            // Print latest video's information
            console.log(
                "TimeStamp: " + currentDate + '\n' +
                "Video Title: " + videoTitle.trunc(50) + '\n' +
                "Video URL: " + videoURL
            )

           // fs.appendFileSync('../videoLog.json', 'data to append');

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
            )
        }
    )
}

searching()
