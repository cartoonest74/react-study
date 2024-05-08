const React = require("react");
const {component} = React;

const Gugudan=()=>{
    const [first,setFirst] = React.useState(Math.ceil(Math.random()*9));
    const [second,setSecond] = React.useState(Math.ceil(Math.random()*9));
    const [value,setValue] = React.useState('');
    const [result,setResult] = React.useState(first * second);
    const [comment,setCommnet] = React.useState(''); 
    const inputRef = React.useRef(null);

    const calc_result =()=>{
        const answer_gugu = first * second;
        inputRef.current.focus();
        if(parseInt(answer_gugu) == value){
            setFirst(Math.ceil(Math.random()*9)); 
            setSecond(Math.ceil(Math.random()*9)); 
            setValue(''); 
            setCommnet('정답: '+ value);
            return setResult(first * second)
        }
        return setCommnet('틀렸습니다');
    }

    const gugudan_onChange = (e)=>{
        setValue(e.target.value);
        return e.target.value;
    }
    
    return(
        <React.Fragment>
            <div>{first} x {second}</div>
            <input ref={inputRef} type="number" onChange={gugudan_onChange}/>
            <button type="button" onClick={calc_result}>click</button>
            <div>{comment}</div>
        </React.Fragment>
    );
}

module.exports = Gugudan;