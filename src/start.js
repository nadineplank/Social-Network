import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

import App from "./app";
// import Home from "./home";
// import Welcome from "./welcome";

let elem;
if (location.pathname == "/register") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
