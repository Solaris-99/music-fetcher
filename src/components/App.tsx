import Search from './Search'
import MusicElementContainer from './MusicElementContainer'
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material'
import '../css/App.css'
import {useState} from 'react'
import FileViewer from './FileViewer'
import Header from './Header'
import DownloadProgress from './DownloadProgress'
import Video from './Video'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className='h-full'
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className='h-full w-full'>
          <div className='h-full'>{children}</div>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if(newValue == 1){
      window.ipcRenderer.send('folder-contents',1)
    }

  };

  return (
    <>
      <Header></Header>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label='Youtube' />
        <Tab label='Archivos' />
      </Tabs>
      <TabPanel value={tabValue} index={0} >
      <Box className='h-full w-full p-4'>
        <Box className='h-3/5'>
        <Box className=' justify-center h-full w-full'>
            <Paper className='h-full overflow-auto pt-2'>
                <Paper className='sticky -top-2 z-50 py-2'>
                  <Search></Search>
                </Paper>
            <MusicElementContainer></MusicElementContainer>
            </Paper>
          </Box>

          <Box className='h-3/6 w-full'>
            <Paper className='flex h-full w-full mt-1'>
              <DownloadProgress></DownloadProgress>
              <Video src='https://www.youtube.com/embed/qHv7hHfeNsk'></Video>
            </Paper>                      
          </Box>
        </Box>
      </Box>  
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper>
          <FileViewer></FileViewer>
        </Paper>
        {/* Content for the 'Archivos' tab goes here */}
      </TabPanel>



    </>
  )
}

export default App
