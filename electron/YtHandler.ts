import { search, validate, stream, YouTubeVideo} from "play-dl";

export default class YtHandler{
    private static instance :YtHandler;

    public static getInstance(){
        if(this.instance === undefined){
            this.instance = new YtHandler();
        }
        return this.instance;
    }

    public async search(txt: string){
        const res : YouTubeVideo[] = await search(txt);
        return res;
    }

    public async download(url:string){
        const strm = await stream(url)
        console.log("stream obj",strm)
        console.log("strm property:",strm.stream)
        // const outstrm = createWriteStream('TEST_FILE.wav')
        // outstrm.on('finish',()=>{console.log('finished writing')})
        // outstrm.on('error', (error) => {console.error('Error writing audio file:', error);});

    }


}

