const React = require('react');
const ReactDom = require('react-dom/client');

const WordRealy = require('./wordRelay');

ReactDom.createRoot(document.querySelector("#root")).render(<WordRealy/>);