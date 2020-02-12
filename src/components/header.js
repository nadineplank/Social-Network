import React from "react";

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

                <a className="nav" href="/chat">
                    <i className="far fa-comments"></i>
                </a>
                <i className="fas fa-search" onClick={this.props.showSearch} />

                <i className="fas fa-bars" onClick={this.props.showMenu} />
            </div>
        );
    }
}
