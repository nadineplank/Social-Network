import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        if (props.userId) {
            try {
                (async () => {
                    const { data } = await axios.get(
                        "/friends-status/" + props.userId
                    );

                    if (!data) {
                        setButtonText("send friend request");
                    } else if (data.accepted == false) {
                        if (data.sender_id == props.userId) {
                            setButtonText("cancel friend request");
                        } else if (data.recipient_id == props.userId) {
                            setButtonText("accept friend request");
                        }
                    } else if (data.accepted == true) {
                        setButtonText("end friendship");
                    }
                })();
            } catch (err) {
                console.log("err in useEffect: ", err);
            }
        }
    });

    const handleClick = () => {
        let path;
        if (buttonText == "send friend request") {
            path = "/make-friend-request/";
        } else if (buttonText == "accept friend request") {
            path = "/accept-friend-request/";
        } else if (
            buttonText == "cancel friend request" ||
            buttonText == "end friendship"
        ) {
            path = "/end-friendship/";
        }

        try {
            (async () => {
                const { data } = await axios.post(path + props.userId);
                console.log("data from friendButton axios: ", data);
                if (data.success) {
                    if (buttonText == "send friend request") {
                        setButtonText("cancel friend request");
                    } else if (buttonText == "accept friend request") {
                        setButtonText("end friendship");
                    } else if (
                        buttonText == "cancel friend request" ||
                        buttonText == "end friendship"
                    ) {
                        setButtonText("send friend request");
                    }
                }
            })();
        } catch (err) {
            console.log("error in axios post: ", err);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}
