import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Home from "./home";
// import Welcome from "./welcome";

let elem;
if (location.pathname == "/register") {
    elem = <Welcome />;
    // } else if (location.pathname == "/home") {
    //     elem = <Home />;
} else {
    elem = <img src="/logo.png" />;
}

ReactDOM.render(elem, document.querySelector("main"));
