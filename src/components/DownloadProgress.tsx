import { useState, useEffect } from 'react';
import { Box, ListItemText, List } from '@mui/material';

function DownloadProgressItem({name: name, progress:progress}){
    return (<ListItemText primary={`${name} ${progress}%`}/>)
}


export default function DownloadProgress(){ 
    const [childs, setChilds] = useState([]);

    useEffect(()=>{
        window.ipcRenderer.removeAllListeners('yt-download-progress')
        window.ipcRenderer.on("yt-download-progress",(e,resp)=>{
            setChilds(resp)
        })

    })

    return (
        <Box className='h-50'>
            <List>
                {childs.map((item, index)=>(<DownloadProgressItem key={index} name={item.name} name={item.progress}></DownloadProgressItem>))}
            </List>
        </Box>
    )

}