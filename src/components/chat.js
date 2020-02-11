import React, { useEffect, useRef } from "react";
import { socket } from "../socket.js";
import { useSelector } from "react-redux";

export function Chat() {
    let chatMessages = useSelector(state => state && state.chatMessages);
    chatMessages = chatMessages.reverse();
    console.log("chatMessages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted!!!");
        console.log("elemRef: ", elemRef);
        let { clientHeight, scrollTop, scrollHeight } = elemRef.current;

        console.log("scroll top", scrollTop);
        console.log("client height", clientHeight);
        console.log("scroll height", scrollHeight);
        elemRef.current.scrollTop = scrollHeight - clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault(); // stops the annoyong moving to a new line
            console.log("what the user is typing: ", e.target.value);
            console.log("which key is user pressed...", e.key);
            socket.emit("chat message", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chat">
            <h1>Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages.length > 0 &&
                    chatMessages.map((i, idx) => {
                        return (
                            <div className="chat-block" key={idx}>
                                <a href={`user/${i.user_id}`}>
                                    <div>
                                        <img src={i.image || "/default.png"} />
                                        <p>
                                            {i.first} {i.last}
                                        </p>
                                    </div>
                                </a>
                                <p className="chat-message">{i.message}</p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                className="chat-textarea"
                placeholer="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
