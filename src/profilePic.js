import React from "react";

export default function ProfilePic(props) {
    let name = props.first + " " + props.last;
    const clickHandler = props.clickHandler;

    return (
        <div>
            <img src={props.image} alt={name} onClick={clickHandler} />
        </div>
    );
}
