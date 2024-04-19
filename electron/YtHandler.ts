import { search, validate, stream, YouTubeVideo} from "play-dl";
import ytdlp from 'ytdlp-nodejs';

export default class YtHandler{
    private static OUTPUT_DIR = './music/'
    private static instance :YtHandler;

    public static getInstance(){
        if(YtHandler.instance === undefined){
            YtHandler.instance = new YtHandler();
        }
        return YtHandler.instance;
    }

    public async search(txt: string){
        const res : YouTubeVideo[] = await search(txt);
        return res;
    }

    public download(url:string){
        //recibir nombre
        const download = ytdlp.download(url,{filter:'audioonly',output:{fileName:'test',outDir:YtHandler.OUTPUT_DIR}})
        download.on('finished',()=>{console.log('download finished')})
        download.on('progress',(p)=>{console.log('downloading ',p)})
        download.on('error',(e)=>{console.log('download error:',e)})
    }


}

