import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="welcome">
                <h1>Welcome</h1>
                <img src="/logo.png" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
