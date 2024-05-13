import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';


export default function DownloadProgress(){ 
    const [text, setText] = useState(['']);
    const [line, setLine] = useState(0);
    useEffect(()=>{
        //remove all old listeners 
        window.ipcRenderer.removeAllListeners('yt-download-progress')
        window.ipcRenderer.on("yt-download-progress",(e,resp)=>{
            if(line == resp.line){
                let textCopy = text;
                textCopy[line] = `${resp.name}: ${resp.progress}`;
                setText(textCopy);
            }
            else{
                setLine(resp.line);
                setText([...text,`${resp.name}: ${resp.progress}`])
            }
        })
    })

    return (
        <Box className='h-full w-4/6 me-4 text-left pl-3 '>
            <Typography variant='h6'>LOG</Typography>
            <Divider> </Divider>
            <div className='bg-black text-cyan-500 overflow-auto' style={{height:"190px"}}>
                    <pre>
                        <Typography >
                            {text.join("\n")}
                        </Typography>
                    </pre>
            </div>
        </Box>
    )

}