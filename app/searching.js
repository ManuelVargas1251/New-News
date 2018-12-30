// reponseHandler

const
    // Imports
    ytdl = require('ytdl-core'),    //youtube vid downloader
    fs = require('fs'),
    moment = require('moment')

/*
{ kind: 'youtube#activityListResponse',
    etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/HKsahEMjt7sgnjfUJcAITqLYrug"',
    nextPageToken: 'CAUQAA',
    pageInfo: { totalResults: 14, resultsPerPage: 5 },
    items:
     [ { kind: 'youtube#activity',
         etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/sDzq1U6B-JWeAd60SuX6VodvpsY"',
         id: 'VTE1MzQ5NzExMDE5NDEwNjIxMDc3NjcyMA==',
         snippet: [Object],
         contentDetails: [Object] },
       { kind: 'youtube#activity',
         etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/5BTVRM7lERWIuW0nyvejp6vdSQg"',
         id: 'VTE1MzQ5NjYzOTM5NDEwNjIxMDc3NjY1Ng==',
         snippet: [Object],
         contentDetails: [Object] },
*/

function responseHandler(body) {

    let videos = []

    console.log(body.items.length + ' videos in response')

    // for each video in response, save to array
    body.items.forEach(function (videoData) {

        //console.log(videoData.snippet.title)

        // search the title for Press Briefing
        // if found, download video
        // else, log title and date
        if (videoData.snippet.title.includes('Press Briefing')) {

            console.warn('✔')

            let videoTitle = videoData.snippet.title,
                videoURL = videoData.contentDetails.upload.videoId,
                videoDate = videoData.snippet.publishedAt,
                fileName = (videoTitle.split('/').join('-')).split(':').join(' ')   //remove : and / from string

            // download the video 😎🌊
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
            //     "Video Title: " + videoTitle + '\n' +
            //     "Video URL: " + videoURL
            // )
        }
        else (
            console.warn('X')
            // send me a text and wait for a response from me??
        )
    });


    // log.log
    // log date of run
    fs.appendFile(
        'log.log',          // filename 

        // file content
        moment().format('MMMM Do YYYY, h:mm:ss a') + '\n',

        // error handler
        (err) => {
            if (err) { return console.log(err); }
            console.error('--date logged--');
        }
    )


    // log video urls
    if (videos === []) {

        console.log('videos:\n' + + videos)

        for (let vid in videos) {
            fs.appendFile(
                //filename
                'videos.urls',

                //data to save
                videos[vid].videoURL + '\n',

                // error handle
                (err) => {
                    if (err) { return console.log(err); }
                    console.error('--urls logged--');
                })
        }

    } else {
        console.log('no videos found')
    }

}

module.exports = responseHandler