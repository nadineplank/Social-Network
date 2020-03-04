import React, { useState } from "react";

export default function Search(props) {
    const [input, setInput] = useState("");
    const onChange = ({ target }) => {
        setInput(target.value);
    };

    return (
        <div className="searchfield">
            <p className="search-icon" onClick={props.showSearch}>
                X
            </p>
            <input
                className="search-input"
                type="text"
                placeholder="enter name"
                onChange={onChange}
            />
            <img className="search-background" src="background0.gif" />
        </div>
    );
}
