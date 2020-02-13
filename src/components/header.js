import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="nav-bar">
                <Link to="/" className="nav">
                    <h1 id="logo">Grow</h1>
                </Link>

                <Link to="/friends" className="nav">
                    <p>friendships</p>
                </Link>

                <Link to="/chat" className="nav">
                    <i className="far fa-comments"></i>
                </Link>

                <Link to="/users" className="nav">
                    <i
                        className="fas fa-search"
                        onClick={this.props.showSearch}
                    >
                        <p className="nav">find friends</p>
                    </i>
                </Link>

                <i className="fas fa-bars" onClick={this.props.showMenu}></i>
            </div>
        );
    }
}
