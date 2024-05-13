const React = require("react"); 
const {component, useState, useRef, useEffect} = React;

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 컴포넌트가 첫 렌더링 된 후
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate 리렌링 된 후
//  부모가 자식을 없앴을 때 ->  componentWillUnmount 컴포넌트가 제거되기 직전 -> 소멸 

const rspCoord ={
    siser:"-60",
    rock:"-348",
    pager:"-620"
}

const rspPoint ={
    fail:["졌습니다.",-1],
    draw:["비겼습니다.",0],
    win:["이겼습니다.",1]
}

const RSP = ()=>{
    
    const [rspIndex,setRspIndex] = useState(0);
    const [rspCoordV,setRspCoordV] = useState(rspCoord.siser);
    const [result,setResult] = useState(0);
    const [comment,setComment] = useState("");

    const sleepTime = useRef(null);
    const rspCount =useRef(0);
    const rspStatus =useRef(null);
    
    const rspCoord_keys = Object.keys(rspCoord);
    useEffect(()=>{
        const rspCoord_length = Object.keys(rspCoord).length;
        const rsp_img = document.querySelector("#rsp_img");
        
        sleepTime.current = setTimeout(()=>{
            setRspCoordV(rspCoord[rspCoord_keys[rspCount.current]])
            setRspIndex(rspCount);
        },100)
        rspCount.current += 1;
        
        if(rspCoord_length == rspCount.current){
            rspCount.current = 0;
        }
        return ()=>{
            clearInterval(rsp_img);
        }
    },[rspCoordV])

    const rspClick = (e)=>{
        const player_index = parseInt(e.target.getAttribute("data-rsp-index"));
        console.log("rspIndex.current",rspIndex.current);
        console.log("player_index",player_index);
        if(player_index - (rspIndex.current-1)  == 1){
            rspStatus.current = "win";
        }
        if(player_index - (rspIndex.current-1) == -1){
            rspStatus.current = "fail";
        }
        if(player_index - (rspIndex.current-1)== 0){
            rspStatus.current = "draw";
        }

        console.log(rspStatus.current);
        clearInterval(sleepTime.current);
        setComment(rspPoint[rspStatus.current][0])
        setResult((prevResult)=>prevResult + rspPoint[rspStatus.current][1])

        setTimeout(()=>{
            setRspCoordV(rspCoord[rspCoord_keys[rspCount.current]]);
        },1000)
    }

    return (
        <React.Fragment>
            <div className="rsp_contain">
                <img id="rsp_img" style={{marginLeft:`${rspCoordV}px`}} src="https://i.namu.wiki/i/BRuQY3BKTiEhiRBU8ES-qzaOudwhLyZdoG_llPtr3Jb6WPiSeHsErpvqAuImlkagZ996oDYDfe4Cma8nd2Vr_IiMtQIGnn-1PY-NBBvqU11wFFoL6bNUfZK5AoOvxUo-OADFq6v2CTiBkYxDKWSjAg.webp" alt="rocksiserpager" />
            </div>
            <div className="rsp_controll"> 
                <button type="button" data-rsp-index="0" onClick={rspClick}>가위</button>
                <button type="button" data-rsp-index="1" onClick={rspClick}>바위</button>
                <button type="button" data-rsp-index="2" onClick={rspClick}>보</button>
            </div>
            <div>
                <span>Score:</span><span>{result}</span>
                <p>{comment}</p>
            </div>
        </React.Fragment>
    );
}

module.exports=RSP;