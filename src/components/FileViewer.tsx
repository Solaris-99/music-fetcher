import { List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useState, useEffect } from "react";



export default function FileViewer(){
    const [files, setFiles] = useState([] as string[])
    useEffect(()=>{
        window.ipcRenderer.on('folder-update',(e,files)=>{
            console.log(files)
            setFiles(files)
        })

    },[files,setFiles] )
    
    return(
        <List className="overflow-auto">
            {files.map((item, index)=>(
            <ListItemButton key={index}>
                <ListItemIcon><AudioFileIcon></AudioFileIcon></ListItemIcon>
                <ListItemText primary={item}></ListItemText>
            </ListItemButton>
            ))}
        </List>
    )


}