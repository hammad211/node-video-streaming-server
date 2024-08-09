const express = require('express');
const fs = require('fs');

const app = express();

const videoFileMap = {
    'video1':'videos/dolly.mp4',
    'video2':'videos/video.mp4',
    'video3':'videos/videoplayback.mp4',
}

app.get('/videos/:filename',(req,res)=>{
    const filename = req.params.filename;
    const filePath = videoFileMap[filename];
    if(!filePath){
        console.log("not found")
        return res.status(404).send('File not found')
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.header.range;

    if (range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[1],10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range':`bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges':'bytes',
            'Content-Length':chunksize,
            'Content-Type':'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else{
        const head = {
            
            'Content-Length':fileSize,
            'Content-Type':'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);

    }
})

app.listen(5000, ()=>{
    console.log("server listening");
})