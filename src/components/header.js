import React from "react";

import Uploader from "../hooks/useDragAndDrop";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="nav-bar">
                <h1 id="logo">Grow</h1>
                <a className="nav" href="/users">
                    find friends
                </a>

                <a className="nav" href="/friends">
                    friendships
                </a>

                <img
                    id="profilePic"
                    src={this.props.image}
                    alt={`${this.props.name} ${this.props.last}`}
                    onClick={this.props.toggleState}
                    first={this.props.first}
                    last={this.props.last}
                />
                {this.state.uploaderVisible && (
                    <Uploader setImageUrl={image => this.setState({ image })} />
                )}

                <i className="fas fa-bars"></i>
                <a href="/logout">
                    <i className="fas fa-sign-out-alt"></i>
                </a>
            </div>
        );
    }
}
