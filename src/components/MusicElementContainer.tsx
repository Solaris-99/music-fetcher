import { Stack } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import MusicElement from "./MusicElement"
import { YouTubeVideo } from 'play-dl';


export default function MusicElementContainer(){
    const [childs, setChilds] = useState([] as YouTubeVideo[])
    useEffect(()=>{
        window.ipcRenderer.removeAllListeners('yt-status')
        window.ipcRenderer.removeAllListeners('yt-search-response') // remove old listeners
        window.ipcRenderer.on('yt-search-response',(e,resp: YouTubeVideo[])=>{
            setChilds(resp)
        })    

    }, [childs,setChilds])

    return(
        <>
        <Stack>
          {childs.map((item:YouTubeVideo,index)=>(
              <MusicElement key={index} {...item}></MusicElement>
            )
          )}
        </Stack>
        </>
    )

}