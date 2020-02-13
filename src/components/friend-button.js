import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ recipient, userId }) {
    const [buttonText, setButtonText] = useState("");
    const [buttonClass, setButtonClass] = useState("");

    useEffect(() => {
        if (userId) {
            try {
                (async () => {
                    console.log(recipient);
                    const { data } = await axios.get(
                        `/friend-status/${recipient}`
                    );

                    if (!data) {
                        setButtonText("send friend request");
                        setButtonClass("send-button");
                    } else if (data.accepted == false) {
                        if (data.sender_id == userId) {
                            setButtonText("cancel friend request");
                            setButtonClass("cancel-button");
                        } else if (data.recipient_id == userId) {
                            setButtonText("accept friend request");
                            setButtonClass("accept-button");
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
                const { data } = await axios.post(`${path}${recipient}`);
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
            <button className={buttonClass} onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );
}
