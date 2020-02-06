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
                <img src="/logo.png" alt="Logo" />

                <img
                    className="profilePicHeader"
                    src={this.props.image}
                    alt={`${this.props.name} ${this.props.last}`}
                    onClick={this.props.toggleState}
                    first={this.props.first}
                    last={this.props.last}
                />
                {this.state.uploaderVisible && (
                    <Uploader setImageUrl={image => this.setState({ image })} />
                )}
            </div>
        );
    }
}
