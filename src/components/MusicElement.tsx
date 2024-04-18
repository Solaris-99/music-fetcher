import DownloadIcon from '@mui/icons-material/Download';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import { YouTubeVideo } from 'play-dl';


export default function MusicElement(props: YouTubeVideo) {


    return (
        <>
                <Card className='m-2 m-element w-4/5' >
                <CardActionArea onClick={()=>{
                    window.ipcRenderer.send('yt-download-request',props.url)
                    console.log(props.url)
                }}>
                    <Paper className='flex h-28'>
                        <img className='inline yt-img' src={props.thumbnails[0].url} />
                        <Box className='flex justify-between p-2 w-full'>
                            <Box className='w-4/5'>
                                <Typography variant='h5'>{props.title}</Typography>
                                <Typography variant='body2'>{props.channel?.artist}</Typography>
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