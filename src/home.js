import React from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => this.setState(data));
    }

    // upload() {}

    render() {
        if (!this.state.id) {
            return <img src="/progressbar.gif" alt="Loading..." />;
        }
        return (
            <div>
                <img src="/logo.png" alt="Logo" />
                <ProfilePic
                    showUploader={() =>
                        this.setState({ uploaderVisible: true })
                    }
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                />
                {this.state.uploaderVisible && (
                    <Uploader setImageUrl={image => this.setState({ image })} />
                )}
                <div>
                    <Profile
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        image={this.state.image}
                        onClick={this.uploaderVisible}
                        bio={this.state.bio}
                        setBio={bio => this.setState({ bio })}
                    />
                </div>
            </div>
        );
    }
}
