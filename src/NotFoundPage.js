import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <img className="gif-background" src="background.gif" />
                <p id="text404">404</p>
                <p style={{ textAlign: "center" }}>
                    <Link to="/">Go to Home </Link>
                </p>
            </div>
        );
    }
}
export default NotFoundPage;
