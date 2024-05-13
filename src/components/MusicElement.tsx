import DownloadIcon from '@mui/icons-material/Download';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { YouTubeVideo } from 'play-dl';
import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadingIcon from '@mui/icons-material/Downloading';


function HandleIcon({ state: state }) {
    const cssClass = 'block m-auto';
    if (state == 'success.main') {
        return (<CheckCircleIcon className={cssClass}></CheckCircleIcon>)
    }
    else if (state == 'warning.main') {
        return (<DownloadingIcon className={cssClass}></DownloadingIcon>)
    }
    else {
        return (<DownloadIcon className={cssClass}></DownloadIcon>)
    }

}


export default function MusicElement(props: YouTubeVideo) {
    const [state, setState] = useState({ state: '', id: props.id })
    //const [icon, setIcon] = useState(HandleIcon({state.state}))

    const handleClick = function () {
        if (state.state == 'info.main') {
            window.ipcRenderer.send('yt-download-request', [props.url, props.title, props.channel?.name, props.id])
            setState({ state: state.state, id: props.id })
            console.log(props.url)
        }
        else if (state.state == 'success.main') {
            console.log('play music!'); //TODO
        }
    }

    useEffect(() => {

        window.ipcRenderer.on('yt-status', (e, update) => {
            if (update.id == props.id) {
                setState({ state: update.state, id: props.id })
            }
        })

        window.ipcRenderer.on('yt-search-states', (e, downloaded) => {
            if (downloaded.includes(props.url)) {
                setState({ state: 'success.main', id: props.id })
            }
            else {
                setState({ state: 'info.main', id: props.id })
            }
        })

    }, [props.id, props.title, props.url, state])

    const sendUrlVideo = function () {
        window.ipcRenderer.send('video-play', props.url)
    }

    return (
        <>
            <Card className='m-2 mx-auto w-4/5 flex pr-4'>
                <CardActionArea onClick={handleClick}>
                    <Paper sx={{ borderColor: state.state }} variant='outlined' className='flex h-28 music-paper'>
                        <img className='inline yt-img rounded-md' src={props.thumbnails[0].url} />
                        <Box className='flex justify-between p-2 w-full' >
                            <Box className='w-4/5'>
                                <Typography variant='h5'>{props.title}</Typography>
                                <Typography variant='body2'>{props.channel?.name}</Typography>
                                <Typography variant='body2'>{props.url}</Typography>
                            </Box>
                            <HandleIcon state={state.state} ></HandleIcon>
                        </Box>



                    </Paper>
                </CardActionArea>
                <PlayArrowIcon onClick={sendUrlVideo} className='rounded-full solid border-2 my-auto ml-2' ></PlayArrowIcon>
            </Card>
        </>
    )

}