import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <img src="/logo.png" />
                <Registration />
            </div>
        );
    }
}
