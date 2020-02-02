import React from "react";

import Bio from "./bio";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="profile">
                <ProfilePic
                    showUploader={() =>
                        this.setState({ uploaderVisible: true })
                    }
                    image={this.props.image}
                />
                {this.state.uploaderVisible && (
                    <Uploader setImageUrl={image => this.setState({ image })} />
                )}
                <p>
                    {this.props.first} {this.props.last}
                </p>

                <Bio
                    editBio={() => this.setState({ setBio: true })}
                    bio={this.props.bio}
                    setBio={this.props.setBio}
                />
            </div>
        );
    }
}
