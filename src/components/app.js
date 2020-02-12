import React from "react";
import axios from "../axios";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Profile from "./profile";
import Uploader from "./DragAndDrop";
import { OtherProfile } from "./other-profile";
import FindPeople from "./find-people";
import Header from "./header";
import Page404 from "./Page404";
import Friends from "./friends";
import { Chat } from "./chat";
import Search from "./search";

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
    showMenu() {
        this.setState({
            menuVisible: !this.state.menuVisible
        });
    }
    showSearch() {
        console.log("click happening");
        this.setState({
            searchVisible: !this.state.searchVisible
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
                {this.state.searchVisible && (
                    <Search showSearch={() => this.showSearch()} />
                )}
                <Header
                    first={this.state.first}
                    last={this.state.first}
                    image={this.state.image}
                    toggleState={() => this.toggleState()}
                    showMenu={() => this.showMenu()}
                    showSearch={() => this.showSearch()}
                />

                {this.state.uploaderVisible && (
                    <Uploader
                        setImageUrl={image => this.setState({ image })}
                        toggleState={() => this.toggleState()}
                    />
                )}
                {this.state.menuVisible && (
                    <div className="menu" onClick={() => this.showMenu()}>
                        <a className="nav" href="/">
                            <img
                                id="profilePic"
                                src={this.state.image}
                                alt={`${this.state.name} ${this.state.last}`}
                                first={this.state.first}
                                last={this.state.last}
                            />
                        </a>
                        <a className="nav" href="/">
                            your profile
                        </a>
                        <a href="/logout">
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </div>
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
