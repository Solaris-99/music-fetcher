import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material'


export default function Video({src: src}){

    const [videoSrc, setVideoSrc] = useState(src);

    useEffect(()=>{
        console.log(videoSrc);
        
        window.ipcRenderer.removeAllListeners('video-play-iframe');
        window.ipcRenderer.on('video-play-iframe',(e,url)=>{
            setVideoSrc(url);
        })
        
    })

    return(
        <Box className='my-auto w-fit'>
            <iframe width="280" height="200" src={videoSrc} title="YouTube video player" frameborder="0" allow="autoplay; " allowfullscreen>
            </iframe>
        </Box>
    )



}