import { search, YouTubeVideo} from "play-dl";
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

    public download(file_data:string[]){
        //recibir nombre
        const file_name = file_data[2] +' - '+file_data[1]+".mp3"
        console.log(file_name)
        const download = ytdlp.download(file_data[0],{filter:'audioonly',output:{fileName:file_name,outDir:YtHandler.OUTPUT_DIR}})
        return download;
        
        
    }


}

