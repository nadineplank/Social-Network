import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        /// this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
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
                    <div className="error">Oops! Something went wrong!</div>
                )}
                <div className="auth-input-container">
                    <input
                        className="auth-input"
                        name="first"
                        placeholder="first name"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="auth-input"
                        name="last"
                        placeholder="last name"
                        onChange={e => this.handleChange(e)}
                    />

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
                    <Link className="auth-btn" to="/login">
                        log in
                    </Link>
                    <button className="auth-btn" onClick={() => this.submit()}>
                        register
                    </button>
                </div>
            </div>
        );
    }
}
