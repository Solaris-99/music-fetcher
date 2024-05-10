import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';


export default function DownloadProgress(){ 
    const [text, setText] = useState("");

    useEffect(()=>{
        //remove all old listeners 
        window.ipcRenderer.removeAllListeners('yt-download-progress')
        window.ipcRenderer.on("yt-download-progress",(e,resp)=>{
            setText(`${resp.name}: ${resp.progress}`)
        })

    })

    return (
        <Box>
            <Paper>
                <Typography>
                    {text}
                </Typography>
            </Paper>
        </Box>
    )

}