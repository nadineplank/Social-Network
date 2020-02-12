import React from "react";

export default function ProfilePic(props) {
    let name = props.first + " " + props.last;
    const toggleState = props.toggleState;

    return (
        <div>
            <img
                className="profile-pic"
                src={props.image}
                alt={name}
                onClick={toggleState}
            />
        </div>
    );
}
