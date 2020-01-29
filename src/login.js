import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
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
    login() {
        console.log("State: ", this.state);
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.id) {
                    location.replace("/home");
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
                <button onClick={() => this.login()}>Log in</button>
            </div>
        );
    }
}
