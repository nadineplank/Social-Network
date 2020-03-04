import React from "react";
import axios from "../axios";
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
                    this.props.history.push("/404");
                } else if (id == data.userId) {
                    this.props.history.push("/");
                } else if (data.success) {
                    this.setState(data);
                }
            })
            .catch(err => {
                console.log("err in otherProfile: ", err);
                this.props.history.push("/404");
            });

        //we also want to redirect when the user doesnt exist..
    }

    render() {
        return (
            <div className="container">
                <div className="profile">
                    <img
                        className="profile-pic"
                        src={this.state.image}
                        alt={(this.state.first, " ", this.state.last)}
                    />
                    <div className="profile-container">
                        <p className="username">
                            {this.state.first} {this.state.last}
                        </p>
                        <div className="bio-container">
                            <p className="bio">{this.state.bio}</p>
                            <FriendButton
                                userId={this.state.userId}
                                recipient={this.state.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
