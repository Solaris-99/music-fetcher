import { Stack } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import MusicElement from "./MusicElement"
import { YouTubeVideo } from 'play-dl';


export default function MusicElementContainer(){
    const [childs, setChilds] = useState([] as YouTubeVideo[])
    useEffect(()=>{
        window.ipcRenderer.on('yt-search-response',(e,resp: YouTubeVideo[])=>{
            setChilds(resp)
        })
    }, [childs,setChilds])

    return(
        <>
        <Stack>
          {childs.map((item:YouTubeVideo)=>(
              <MusicElement key={item.id} {...item}></MusicElement>
            )
          )}
        </Stack>
        </>
    )

}