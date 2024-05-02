import DownloadIcon from '@mui/icons-material/Download';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { YouTubeVideo } from 'play-dl';
import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';



export default function MusicElement(props: YouTubeVideo) {
    const [state, setState] = useState({state:'', id: props.id})
    
    const handleClick = function(){
        if(state.state == 'info.main'){
            window.ipcRenderer.send('yt-download-request',[props.url, props.title,props.channel?.name,props.id])
            setState({state:state.state, id: props.id})
            console.log(props.url)
        }
        else if (state.state == 'success.main'){
            // console.log('play music!') TODO
        }
    }

    useEffect(()=>{

        window.ipcRenderer.on('yt-status',(e, update)=>{
            if(update.id == props.id){
                setState({state:update.state, id:props.id})
            }
        })
        
        window.ipcRenderer.on('yt-search-states',(e,downloaded)=>{
            if(downloaded.includes(props.url)){
                setState({state:'success.main', id:props.id})
            }
            else{
                setState({state:'info.main',id:props.id})
            }
        })


    },[props.id, props.title, props.url, state])

    return (
        <>
                <Card className='m-2 mx-auto w-4/5' >
                <CardActionArea onClick={handleClick}>
                    <Paper sx={{borderColor: state.state}} variant='outlined' className='flex h-28 music-paper'>
                        <img className='inline yt-img rounded-md' src={props.thumbnails[0].url} />
                        <Box className='flex justify-between p-2 w-full'>
                            <Box className='w-4/5'>
                                <Typography variant='h5'>{props.title}</Typography>
                                <Typography variant='body2'>{props.channel?.name}</Typography>
                                <Typography variant='body2'>{props.url}</Typography>
                            </Box>
                            {state.state == 'success.main'?<PlayArrowIcon className='block m-auto'></PlayArrowIcon>:<DownloadIcon className='block m-auto'></DownloadIcon>}
                        </Box>
                    </Paper>
                </CardActionArea>
                </Card>
        </>
    )

}