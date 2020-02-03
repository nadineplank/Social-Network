import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./uploader";
import { OtherProfile } from "./other-profile";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        {
            /*this.showUploader = this.showUploader.bind(this);
        this.setImageUrl = this.setImageUrl.bind(this);
        this.setBio = this.setBio.bind(this); */
        }
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("data", data);

            this.setState(data);
        });
    }

    render() {
        if (!this.state.id) {
            return <img src="/progressbar.gif" alt="Loading..." />;
        }
        return (
            <div>
                <BrowserRouter>
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
                            <Uploader
                                setImageUrl={image => this.setState({ image })}
                            />
                        )}
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        image={this.state.image}
                                        onClick={this.uploaderVisible}
                                        bio={this.state.bio}
                                        setBio={bio => this.setState({ bio })}
                                    />
                                )}
                            />

                            <Route path="/user/:id" component={OtherProfile} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
