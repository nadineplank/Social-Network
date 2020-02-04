import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <div>
            <h1>Find other people</h1>
            <p>Checkout who just joined!</p>

            {newUsers.map((newUser, idx) => {
                return (
                    <a
                        className="newUser"
                        hred={`/user/${newUser.id}`}
                        key={idx}
                    >
                        <div className="profile" key={idx}>
                            <img className="profilePic" src={newUser.image} />

                            <p className="name">{`${newUser.first} ${newUser.last}`}</p>
                        </div>
                    </a>
                );
            })}

            <input onChange={onChange} type="text" placeholder="enter name" />
            {users.map((user, idx) => {
                return (
                    <a className="newUser" hred={`/user/${user.id}`} key={idx}>
                        <div className="profile" key={idx}>
                            <img className="profilePic" src={user.image} />

                            <p className="name">{`${user.first} ${user.last}`}</p>
                            <p>{user.bio}</p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
