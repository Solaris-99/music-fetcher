import Search from './Search'
import MusicElementContainer from './MusicElementContainer'
import { Box, Paper, Typography } from '@mui/material'
import '../css/App.css'
import FileViewer from './FileViewer'
import Header from './Header'

function App() {

  return (
    <>
      <Header></Header>
      <Box className='h-full w-full p-4'>
        <Box className='flex h-95'>
          
          <Box className='w-3/12 mr-2'>
            <Paper className='h-full'>
              <Paper square elevation={1}>
                <Typography variant="h6" color="initial">Archivos</Typography>
              </Paper>
              <FileViewer></FileViewer>
            </Paper>
          </Box>
          
          <Box className=' justify-center h-full w-full'>
            
            <Paper className='h-full overflow-auto pt-2'>
                <Paper className='sticky -top-2 z-50 py-2'>
                  <Search></Search>
                </Paper>
              <MusicElementContainer></MusicElementContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
