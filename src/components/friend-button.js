import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ recipient, userId }) {
    const [buttonText, setButtonText] = useState("");
    const [buttonId, setButtonId] = useState("");

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
                        setButtonId("send-button");
                    } else if (data.accepted == false) {
                        if (data.sender_id == userId) {
                            setButtonText("cancel friend request");
                            setButtonId("cancel-button");
                        } else if (data.recipient_id == userId) {
                            setButtonText("accept friend request");
                            setButtonId("accept-button");
                        }
                    } else if (data.accepted == true) {
                        setButtonText("unfriend");
                        setButtonId("cancel-button");
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
            buttonText == "unfriend"
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
                        setButtonText("unfriend");
                    } else if (
                        buttonText == "cancel friend request" ||
                        buttonText == "unfriend"
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
            <button className="bio-button" id={buttonId} onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );
}
