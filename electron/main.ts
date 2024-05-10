import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import YtHandler from './YtHandler'
import fs from 'node:fs';
import {setTimeout} from 'timers/promises'
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
const handler = YtHandler.getInstance()
handler.loadMapping();

console.log(handler)


function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width:1000,
    height:800,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
    },
  })
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    win?.webContents.send('folder-update', fs.readdirSync('./music/').filter((item)=>item.endsWith('.mp3')) )    
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)



ipcMain.on('yt-search',async (e,args)=>{ 
  const resp = await handler.search(args)
  const downloaded = []

  for(let video of resp){
    if(handler.mapping.urls.includes(video.url)){
      downloaded.push(video.url)
    }
  }
  win?.webContents.send('yt-search-response',resp) // goes to music container
  await setTimeout(300) // wait for the items to exist to update them
  win?.webContents.send('yt-search-states',downloaded)  //music elements  

})

ipcMain.on('yt-download-request',async (e,file_data)=> {
  win?.webContents.send('yt-download-progress',
  { name: file_data[1], progress: "Descarga iniciada..."})
  win?.webContents.send('yt-status', {state:'warning.main',id:file_data[3]}) // FROM: Music Element@35 
  const download = await handler.download(file_data);
  download.on('finished',()=>{
  console.log('download finished');
  win?.webContents.send('folder-update', fs.readdirSync('./music/').filter(item=>item.endsWith('.mp3')))
  win?.webContents.send('yt-status', {state:'success.main',id:file_data[3]})
  //file_data: url, title, channel, id
  handler.appendToMapping(file_data[0],file_data[1]+".mp3")
  })

  download.on('progress',(p)=>{
    console.log(p)
    if(p.percentage < 100){
      
      win?.webContents.send('yt-download-progress',
      { 
        name: file_data[1],
        progress: `${p.downloaded_str}/${p.total_str} ~${p.percentage_str} @${p.speed_str}`
      }
    )}
    else{
      win?.webContents.send('yt-download-progress',
      { 
        name: file_data[1],
        progress: "Completado"
      })
    }
    //win?.webContents.send('yt-download-progress',)
    
  })
  download.on('error',(e)=>{
    console.log('download error:',e)
    win?.webContents.send('yt-status', {state:'error.main',id:file_data[3]})
  })
})

ipcMain.on('quit',()=>{
  app.quit();
})
