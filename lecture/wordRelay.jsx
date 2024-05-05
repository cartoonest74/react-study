const React = require("react");
const {Componet} = React;

const wordRealy = () =>{
    const [test_text,setTest_text] = React.useState("zzzzz");
    return (<React.Fragment>
        <div>{test_text}</div>
    </React.Fragment>);
}

module.exports = wordRealy;