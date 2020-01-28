import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
// import Home from "./home";
// import Welcome from "./welcome";

let elem;
if (location.pathname == "/register") {
    elem = <Registration />;
    // } else if (location.pathname == "/home") {
    //     elem = <Home />;
} else {
    elem = <img src="/logo.png" />;
}

ReactDOM.render(elem, document.querySelector("main"));
