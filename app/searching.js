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
    options = "maxResults=5&part=snippet,contentDetails",
    YOUTUBEAPISTRING = youtubeApiUrl + '?' + 'key=' + apiKey + '&' + 'channelId=' + channelId + '&' + options



// String Truncate function; source: https://stackoverflow.com/a/1199420/7298219
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

// Request the most recent video from the white house
function searching() {

    //GET Request
    request(

        // API URL
        YOUTUBEAPISTRING,

        // Response Format
        { json: true },

        // Response Callback
        (err, res, body, ) => {

            if (err) { return console.log(err); }   // prints any errors and returns

            responseHandler(body)   // handle the response body in a function below
        }
    )
}

searching()

function responseHandler(body) {

    let videos = [],
        currentDate = new Date().toISOString()  // time of check

    // for each video in response, save to array
    body.items.forEach(function (videoData) {

        // search the title for Press Briefing
        // if found, download video
        // else, log title and date
        if (videoData.snippet.title.includes('Press Briefing')) {

            let videoTitle = videoData.snippet.title,
                videoURL = videoData.contentDetails.upload.videoId,
                videoDate = videoData.snippet.publishedAt,
                fileName = (videoTitle.split('/').join('-')).split(':').join(' ')   //remove : and / from string


            ytdl('https://www.youtube.com/watch?v=' + videoURL)     // Source Url
                .pipe(fs.createWriteStream('./downloads/' + fileName + '.mp4'));  // Destination Location

            // save to array of objects
            videos.push({
                'videoTitle': videoTitle,
                'videoURL': videoURL,
                'videoDate': videoDate
            })

            // log to console
            // console.log(
            //     "TimeStamp: " + currentDate + '\n' +
            //     "Video Title: " + videoTitle.trunc(45) + '\n' +
            //     "Video URL: " + videoURL
            // )
        }
        else (
            console.warn('Most recent video does not contain Press Briefing')
            // send me a text and wait for a response from me??
        )
    });

    console.log("---- videos ----")
    console.log(videos)

    // log date of run
    fs.appendFile('log.log', currentDate + '\n', (err) => {
        if (err) throw err;
        console.error('----date logged----');
    })

    // log video urls
    fs.appendFile(
        'videos.urls',  //filename
        'something',
        //data to save
        // videos[0].videoURL + '\n' +
        // videos[1].videoURL + '\n' +
        // videos[2].videoURL + '\n' +
        // videos[3].videoURL + '\n' +
        // videos[4].videoURL + '\n',

        // error handle
        (err) => {
            if (err) throw err;
            console.error('----urls logged----');
        })
}