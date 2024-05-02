import { Paper, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Header(){
    return(
        <Paper className="flex w-full justify-content-between border-b-2 border-sky-500">
            <Box className="w-full titlebar  ps-4 ">
                <Typography fontFamily={'impact'} textAlign={"left"} color={"darkgray"}>Music-fetcher</Typography>
            </Box>
            <CloseIcon className="bg-red-500" onClick={()=>(window.ipcRenderer.send('quit',1))}></CloseIcon>
        </Paper>
    )

}