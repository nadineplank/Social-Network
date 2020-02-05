import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    login() {
        console.log("State: ", this.state);
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.id) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">Email or Password wrong!</div>
                )}
                <div className="auth-input-container">
                    <input
                        className="auth-input"
                        name="email"
                        placeholder="email address"
                        type="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="auth-input"
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <div className="btn-container">
                    <button className="auth-btn" onClick={() => this.login()}>
                        Log in
                    </button>
                    <div id="reset">
                        <p>Forgot your password?</p>
                        <Link to="/resetPassword">reset</Link>
                    </div>
                </div>
            </div>
        );
    }
}
