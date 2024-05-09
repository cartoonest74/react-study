const React = require("react");
const {memo} = React;

const Try =memo(({tryInfo})=>{
    return(
        <React.Fragment>
            <p>
                {tryInfo.try}
            </p>
            <p>
                {tryInfo.result}
            </p>
        </React.Fragment>
    );
});

Try.displayName ='Try';

module.exports=Try;