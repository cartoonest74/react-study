const React = require("react");
const {Componet} = React;
const {useState} = React;
const {useRef} = React;
const Try = require("./Try");

const BaseBall =()=>{
    const getNumbers = () =>{
        
        const ballNumber_list =new Array();
        const number_list = [1,2,3,4,5,6,7,8,9]

        for(let i=0; i<4;i++){
            const baseNum = number_list.splice(Math.floor(Math.random()*(9-i)),1)[0];
            ballNumber_list.push(baseNum);
        }
        return ballNumber_list;
    };

    const [reset,setReset] = useState(false);
    const [tries,setTries] = useState([]);
    const [answer,setAnswer] = useState(getNumbers); // lazy init
    const [result,setResult] = useState([]);
    const inputRef = useRef(null);

    const strike_click =()=>{
        const num_vaild = /\d{4}/g
        const batter_val = document.querySelector("#batter_val").value;
        const bat_chance = 10;
        console.log(answer)
        if(batter_val.match(num_vaild) == null){
            alert("숫자 4자리만 입력하세요!!")
            return
        }

        if(tries.length == bat_chance){
            return
        }

        if(batter_val.includes(answer.join(''))){
            setTries((prevTries)=>[...prevTries,{try:batter_val, result:`Strike!!! GAME Reset!!`}]);
            setReset(true);
            return
        }
        
        if(tries.length == bat_chance-1){
            setTries((prevTries)=>[...prevTries,{try:batter_val, result:`Result:${answer.join('')} OUT!!! GAME Reset!!`}]);
            setReset(true);
            return
        }

        const ball_list = new Array();
        let ball_counter = 0;
        let strike_counter =0;
        batter_val.split('').map((v,i)=>{
            if(answer[i]==v){
                return strike_counter ++;
            }
            if(answer.includes(parseInt(v))){
                ball_counter ++                
            }
        });
        setTries((prevTries)=>[...prevTries,{try:batter_val, result:`Ball: ${ball_counter} Strike: ${strike_counter}`}]);
    }
    
    
    const batter_input =(e)=>{
        return e.target.value;
    }

    const GameReset = ()=>{
        setTries([]);
        setAnswer(getNumbers());
        inputRef.current.focus();
        return setReset(false)
    }

    return(<React.Fragment>
            <div>
                <h1>Number BaseBall!!!!!!</h1>
                <input maxLength="4" ref={inputRef} name="number" id="batter_val" onChange={batter_input}/>
                <button type="button" onClick={strike_click}>click</button>
                <div>시도: {tries.length}</div>
                <div>
                    {
                        tries.map((v,i)=>{
                            return(
                                <Try key={`${i+1}차 시도: ${v.try}`} tryInfo={v}/>
                            );
                        })
                    }
                    {
                        (()=>{
                            if(reset) return (<button type="button" onClick={GameReset}>Reset</button>)
                        })()
                    }
                </div>
            </div>
        </React.Fragment>);
}

module.exports= BaseBall;