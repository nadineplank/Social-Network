import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function findPeople() {
    const [newUsers, setNewUsers] = useState([]);
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(true);

    const onChange = ({ target }) => {
        setInput(target.value);
    };

    useEffect(() => {
        if (!input) {
            (async () => {
                try {
                    const { data } = await axios.get("/newUsers");
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

    const searchBar = (
        <div className="searchfield">
            <p className="search-icon" onClick={() => setSearch(false)}>
                X
            </p>
            <input
                className="search-input"
                type="text"
                placeholder="enter name"
                onChange={onChange}
            />
            <img className="search-background" src="background0.gif" />

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
    );

    return (
        <div className="background">
            <div className="find-container">
                {search && searchBar}

                <p className="header">Checkout who just joined!</p>
                <div className="newUser-container">
                    {newUsers.map((newUser, idx) => {
                        return (
                            <a
                                className="user-container"
                                href={`/user/${newUser.id}`}
                                key={idx}
                            >
                                <img
                                    className="profile-pic"
                                    src={newUser.image}
                                />

                                <p className="search-name">{`${newUser.first} ${newUser.last}`}</p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
