import React, { useEffect, useRef } from "react";
import { socket } from "../socket.js";
import { useSelector } from "react-redux";

export function Chat() {
    let chatMessages = useSelector(state => state && state.chatMessages);
    let user = useSelector(state => state.id);

    const elemRef = useRef();

    useEffect(() => {
        let { clientHeight, scrollHeight } = elemRef.current;

        elemRef.current.scrollTop = scrollHeight - clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault(); // stops the annoyong moving to a new line
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
                            <div
                                className={
                                    i.user_id == user
                                        ? "chat-block-right"
                                        : "chat-block-left"
                                }
                                key={idx}
                            >
                                <a
                                    className="chat-user"
                                    href={`user/${i.user_id}`}
                                >
                                    <img
                                        className="chat-image"
                                        src={i.image || "/default.png"}
                                    />
                                    {i.first} {i.last}
                                </a>
                                <p
                                    className={
                                        i.user_id == user
                                            ? "chat-message-right"
                                            : "chat-message-left"
                                    }
                                >
                                    {i.message}
                                </p>
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
