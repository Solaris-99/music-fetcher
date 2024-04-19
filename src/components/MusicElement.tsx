import DownloadIcon from '@mui/icons-material/Download';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { YouTubeVideo } from 'play-dl';
import { useState, useEffect } from 'react';



export default function MusicElement(props: YouTubeVideo) {
    const [state, setState] = useState({state:'info.main', id: ''})
 

    useEffect(()=>{
        window.ipcRenderer.on('yt-status',(e, update)=>{

            if(update.id == props.id){
                setState({state:update.state, id:props.id})
            }

        })
    },[state,useState])

    return (
        <>
                <Card className='m-2 mx-auto w-4/5' >
                <CardActionArea onClick={()=>{
                    window.ipcRenderer.send('yt-download-request',[props.url, props.title,props.channel?.name,props.id])
                    
                    setState({state:state.state, id: props.id})

                    console.log(props.url)
                }}>
                    <Paper sx={{borderColor: state.state}} variant='outlined' className='flex h-28 music-paper'>
                        <img className='inline yt-img rounded-md' src={props.thumbnails[0].url} />
                        <Box className='flex justify-between p-2 w-full'>
                            <Box className='w-4/5'>
                                <Typography variant='h5'>{props.title}</Typography>
                                <Typography variant='body2'>{props.channel?.name}</Typography>
                                <Typography variant='body2'>{props.url}</Typography>
                            </Box>
                            <DownloadIcon className='block m-auto'></DownloadIcon>
                        </Box>
                    </Paper>
                </CardActionArea>

                </Card>
        </>
    )

}