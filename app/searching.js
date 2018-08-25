// main app start file

const
    // Imports
    ytdl = require('ytdl-core'),
    fs = require('fs')

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

            // download the video 😎
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

module.exports = responseHandler