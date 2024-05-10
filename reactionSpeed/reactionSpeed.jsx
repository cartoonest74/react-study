const React = require("react");
const {component, useState, useRef} = React;


const ReactionSpeed = ()=>{
    const [status,setStatus] = useState("rect-ready");
    const [ment,setMent] = useState("ready!!");
    const [result,setResult] = useState([]);

    const setTime = useRef(null);
    const clcikStartTime = useRef(0);
    const clcikEndTime = useRef(0);
    const clickResultTime = useRef(null);
    const sleepTime = useRef(null);

    const reactionSpeed_Click = ()=>{
        const showTime = Math.ceil(Math.random()*1000)+ 2000 // 3 ~ 4sec 
        // ready 상태일 때 클릭시 waiting 으로 전환 
        if(status.includes("rect-ready")){
            setStatus("rect-waiting");
            setMent("주황색이 나오면 Click해주세욥.");
            setTime.current=setTimeout(()=>{
                setStatus("rect-click");
                setMent("Click!!"); 
                clcikStartTime.current = new Date();
            },showTime);
            return;
        }
        console.log(result)
        // waiting 상태일 때 클릭시 error
        if(status.includes("rect-waiting")){
            clearTimeout(setTime.current);
            setStatus("rect-error");
            setMent("준비 화면에서 클릭을 하면 안됩니다. 검사를 다시 시작합니다.");
            setResult([]);
            setTime.current= setTimeout(()=>{
                setStatus("rect-ready");
                setMent("ready!!"); 
            },2000);
            return;
        }

        // click 상태일 때 클릭시 반응속도 결과 보여주기
        if(status.includes("rect-click")){
            clcikEndTime.current = new Date();
            clearTimeout(setTime.current);
            clickResultTime.current = clcikEndTime.current - clcikStartTime.current
            
            setStatus("rect-end");
            setMent(clickResultTime.current+" ms");
            setResult((prevResult)=>{
                return [...prevResult,parseInt(clickResultTime.current)]
            });
            if(result.length+1 > 4){
                return
            }

            // 반응속도 5번동안만 체크.
            setTime.current=setTimeout(()=>{
                setStatus("rect-ready");
                setMent("ready!!");
                clcikStartTime.current = new Date();
            },showTime);
            return;
        }

    }

    const resultTag=()=>{
        return result.length==5 && <>
                <div className="optionMent">
                    <span>평균 반응속도: </span><span>{Math.floor(result.reduce((prev,curr) =>prev+curr)/result.length)} ms</span>
                </div>
           </>
    }

    return(
        <>
            <h2>반응속도 Check</h2>
            <button type="button" onClick={reactionSpeed_Click} className="rect_body" id={status}>
                <h3 style={{fontSize:"2em"}}>{ment}</h3>
            </button>
            <div className="optionMent">
                <span>{result.length}</span><span>&#47;5</span>
            </div>
            <div className="gageBar">
                <span style={{width:`${result.length*20}%`}}></span>
            </div>
            {resultTag()}
        </>
    );
}

module.exports= ReactionSpeed;