import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function findPeople() {
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
        <div className="find-container">
            <div className="searchfield">
                <p className="search-icon">X</p>
                <input
                    className="search-input"
                    type="text"
                    placeholder="enter name"
                    onChange={onChange}
                />
                <img className="search-background" src="background.gif" />

                <div className="search-result">
                    {users.map((user, idx) => {
                        return (
                            <a
                                className="user-container"
                                href={`/user/${user.id}`}
                                key={idx}
                            >
                                <img className="search-pic" src={user.image} />

                                <p className="search-name">{`${user.first} ${user.last}`}</p>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="newUser-container">
                <p>Checkout who just joined!</p>
                {newUsers.map((newUser, idx) => {
                    return (
                        <a
                            className="newUser"
                            href={`/user/${newUser.id}`}
                            key={idx}
                        >
                            <div className="profile" key={idx}>
                                <img
                                    className="profilePic"
                                    src={newUser.image}
                                />

                                <p className="name">{`${newUser.first} ${newUser.last}`}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
