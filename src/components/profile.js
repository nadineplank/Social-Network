import React from "react";
import Bio from "./bio";
import ProfilePic from "./profilePic";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="profile-container">
                <div className="profile">
                    <ProfilePic
                        toggleState={this.props.toggleState}
                        image={this.props.image}
                    />

                    <div className="bio">
                        <p className="username">
                            {this.props.first} {this.props.last}
                        </p>

                        <Bio
                            editBio={() => this.setState({ setBio: true })}
                            bio={this.props.bio}
                            setBio={this.props.setBio}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
