const React = require("react");
const ReactDom= require("react-dom/client");

const BaseBall = require("./baseball");

ReactDom.createRoot(document.querySelector("#root")).render(<BaseBall/>);