import { TextField } from "@mui/material";


export default function Search(){
    return(
        <>
            <TextField className="my-1 m-x-auto" id="search" label="Search field" type="search" onChange={()=>{
                
                const form = document.getElementById('search') as HTMLInputElement;
                    window.ipcRenderer.send('yt-search',form.value);
                }} />
        
        </>
    )
}