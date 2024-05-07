const React = require("react");
const {Componet} = React;

const getNumbers = () =>{
    const ballNumber_list =new Array();
    for(let i=0; i<4; i++){
        let ball_number = Math.ceil(Math.random()*9);
        ballNumber_list.push(ball_number)
    }
};

const BaseBall =()=>{

    const [value,setValue] = React.useState();
    const [tries,setTries] = React.useState();
    const [answer,setAnswer] = React.useState();
    const [result,setResult] = React.useState();

}

module.exports= BaseBall;