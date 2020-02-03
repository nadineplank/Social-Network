import React from "react";
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        //here we want to make a request to server to get all the info about the requested user...
        console.log("this.props.match", this.props.match.params.id);
        const id = this.props.match.params.id;
        //we want the server to send back all info about requested user.
        // AND the id of the currently logged in user
        // IF these are the same.. we need to redirect them back to the /
        axios.get("/user/" + id + ".json").then(({ data }) => {
            console.log("data", data);
            if (id === data.userId || data.userId === null) {
                this.props.history.push("/");
            } else {
                this.setState(data);
            }
        });

        //we also want to redirect when the user doesnt exist..
    }

    render() {
        return (
            <div className="profile">
                <h1>Hello from other profile..</h1>
                <img
                    src={this.state.image}
                    alt={(this.state.first, " ", this.state.last)}
                />
                <p>
                    {this.state.first} {this.state.last}
                </p>

                <p className="bio">{this.state.bio}</p>
            </div>
        );
    }
}
