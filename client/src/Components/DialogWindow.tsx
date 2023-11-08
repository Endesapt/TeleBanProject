export default function DialogWindow({oppenedMessage}:{oppenedMessage:{id:string,isMine:boolean,x:number,y:number}}){
    const isOpenedClass=oppenedMessage.id?"absolute":"hidden";
    return(<div  className={isOpenedClass+""} 
    style={{top:`${oppenedMessage.y}px`,left:`${oppenedMessage.x}px`}}>
        OPENED WIDOWN ONLINE
    </div>)
}