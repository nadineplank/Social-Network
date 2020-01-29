import React from "react";
import axios from "./axios";
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
        /// axios.post('/register', this.state);

        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("data: ", data);
                if (data.id) {
                    // it worked
                    location.replace("/home");
                } else {
                    // failure
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
                <input
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email address"
                    type="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />

                <button onClick={() => this.submit()}>register</button>
                <div id="login">
                    <p>Already a member? </p>
                    <Link to="/login">Log in</Link>
                </div>
                <div id="reset">
                    <p>Forgot your password?</p>
                    <Link to="/resetPassword">Reset password</Link>
                </div>
            </div>
        );
    }
}
