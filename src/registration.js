import React from "react";
import axios from "axios";

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
        console.log("State: ", this.state);
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
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />

                <button onClick={() => this.submit()}>register</button>
            </div>
        );
    }
}
