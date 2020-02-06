import React from "react";

import Uploader from "./uploader";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="nav-bar">
                <h1 id="logo">Grow Wild</h1>

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

                <a href="/logout">
                    <i className="fas fa-sign-out-alt"></i>
                </a>
            </div>
        );
    }
}
