type Props={
    title:string,
    author:string,
    url:string,
    thumb:string
}


export default function MusicElement(props: Props){
    return (
        <>
        <img src={props.thumb}/>
        <div>
            <p>{props.title}</p>
            <p>{props.author}</p>
            <p><small>{props.url}</small></p>
        </div>
        </>
    )

}