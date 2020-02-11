import React from "react";
import axios from "../axios";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Profile from "./profile";
import Uploader from "../hooks/useDragAndDrop";
import { OtherProfile } from "./other-profile";
import FindPeople from "./find-people";
import Header from "./header";
import Page404 from "./Page404";
import Friends from "./friends";
import { Chat } from "./chat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggleState() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible
        });
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }

    render() {
        if (!this.state.id) {
            return <img src="/progressbar.gif" alt="Loading..." />;
        }
        return (
            <BrowserRouter>
                <Header
                    first={this.state.first}
                    last={this.state.first}
                    image={this.state.image}
                    toggleState={() => this.toggleState()}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        setImageUrl={image => this.setState({ image })}
                        toggleState={() => this.toggleState()}
                    />
                )}
                <div>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div>
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        image={this.state.image}
                                        toggleState={() => this.toggleState()}
                                        bio={this.state.bio}
                                        setBio={bio => this.setState({ bio })}
                                    />
                                </div>
                            )}
                        />

                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/users" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                        <Route component={Page404} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
