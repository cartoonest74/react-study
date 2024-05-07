const React = require("react");
const ReactDom= require("react-dom/clie0nt");

const BaseBall = require("./baseball");

ReactDom.createRoot(document.querySelector("#root")).render(<BaseBall/>);