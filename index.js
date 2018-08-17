const fs = require('fs');
const ytdl = require('ytdl-core');

console.log('start')
ytdl('https://www.youtube.com/watch?v=JPA5l7VoGPI')
    .pipe(fs.createWriteStream('sam.mp4'));