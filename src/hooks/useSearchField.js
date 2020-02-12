import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function Search(props) {
    const [newUsers, setNewUsers] = useState([]);
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);

    const onChange = ({ target }) => {
        setInput(target.value);
    };

    useEffect(() => {
        if (!input) {
            (async () => {
                try {
                    const { data } = await axios.get("/newUsers");
                    console.log("data from findpeople.js /newUsers: ", data);
                    setNewUsers(data);
                } catch (err) {
                    console.log("error in /newUsers: ", err);
                }
            })();
        } else {
            let ignore = false;
            (async () => {
                try {
                    const { data } = await axios.get("/findpeople/" + input);
                    if (!ignore) {
                        setUsers(data);
                    }
                } catch (err) {
                    console.log("error in /findpeople: ", err);
                }
            })();
            return () => {
                ignore = true;
            };
        }
    }, [input]);
    return (
        <div>
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
                <img className="search-background" src="background.gif" />
            </div>
        </div>
    );
}
