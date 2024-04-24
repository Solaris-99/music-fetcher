import { search, YouTubeVideo} from "play-dl";
import ytdlp from 'ytdlp-nodejs';
import fs from 'fs';

export default class YtHandler{
    private static OUTPUT_DIR = './music/'
    private static instance :YtHandler;
    private static CONFIG_FILE = YtHandler.OUTPUT_DIR + 'mapping.json'
    public mapping;

    
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
        const file_name = file_data[1]+".mp3"
        console.log(file_name)
        const download = ytdlp.download(file_data[0],{filter:'audioonly',output:{fileName:file_name,outDir:YtHandler.OUTPUT_DIR}})
        return download;
    }

    public loadMapping(){
        //create folder if does not exists
        if(!fs.existsSync('./music')){
            fs.mkdirSync('./music')
        }
        if(!fs.existsSync(YtHandler.CONFIG_FILE)){
            fs.writeFileSync(YtHandler.CONFIG_FILE,'{"files":[],"urls":[]}'); //create file
        }
        const file = fs.readFileSync(YtHandler.CONFIG_FILE, 'utf-8')
        this.mapping = JSON.parse(file);
    }

    public appendToMapping(url: string, file: string){
        this.mapping.files.push(file);
        this.mapping.urls.push(url);
        fs.writeFileSync(YtHandler.CONFIG_FILE,JSON.stringify(this.mapping)); //save
    }
    
}

