import { TextField } from "@mui/material";



export default function Search(){
    let timeout;

    const handleSearch = function (){
        clearTimeout(timeout)
        window.ipcRenderer.removeAllListeners('yt-status')
        window.ipcRenderer.removeAllListeners('yt-search-states')
        // window.ipcRenderer.removeAllListeners('yt-search-response')
        console.log('yt-status',window.ipcRenderer.listenerCount('yt-status'));
        console.log('yt-search-states',window.ipcRenderer.listenerCount('yt-search-states'));
        console.log('yt-search-response',window.ipcRenderer.listenerCount('yt-search-response'));


        timeout = setTimeout(() => {
            
            const form = document.getElementById('search') as HTMLInputElement;
            window.ipcRenderer.send('yt-search',form.value);                 
        }, 500);
    }


    return(
        <>
            <TextField className="my-1 m-x-auto w-3/4" id="search" label="Search field" type="search" onChange={handleSearch} />
        
        </>
    )
}