import React from "react";
import axios from "./axios";
import FriendButton from "./friend-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios
            .get("/user/" + id + ".json")
            .then(({ data }) => {
                if (!data.success) {
                    this.props.history.push("/nomatch");
                } else if (id == data.userId) {
                    this.props.history.push("/");
                } else if (data.success) {
                    this.setState(data);
                }
            })
            .catch(err => {
                console.log("err in otherProfile: ", err);
                this.props.history.push("/nomatch");
            });

        //we also want to redirect when the user doesnt exist..
    }

    render() {
        return (
            <div className="profile">
                <img
                    src={this.state.image}
                    alt={(this.state.first, " ", this.state.last)}
                />
                <p>
                    {this.state.first} {this.state.last}
                </p>

                <p className="bio">{this.state.bio}</p>
                <FriendButton userId={this.state.userId} />
            </div>
        );
    }
}
