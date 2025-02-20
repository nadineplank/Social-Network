import React from "react";
import Registration from "./registration";
import Login from "./login";

import ResetPassword from "./reset";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        function randomBackground() {
            return "background" + Math.floor(Math.random() * 4) + ".gif";
        }
        return (
            <div>
                <div className="background-container">
                    <img className="gif-background" src={randomBackground()} />
                </div>
                <div className="overlay"></div>
                <div className="auth-container">
                    <div className="auth-wrapper">
                        <h1 id="header">Grow</h1>

                        <HashRouter>
                            <Route exact path="/" component={Registration} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/resetPassword"
                                component={ResetPassword}
                            />
                        </HashRouter>
                    </div>
                </div>
            </div>
        );
    }
}
