import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    endFriendship
} from "../actions";

export default function friendsWannabes() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friends && state.friends.filter(friend => friend.accepted)
    );
    const wannabes = useSelector(
        state =>
            state.friends &&
            state.friends.filter(wannabe => wannabe.accepted === false)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes) {
        return null;
    }
    const acceptedFriends = (
        <div className="friends">
            {friends.map(friend => (
                <div className="user" key={friend.id}>
                    <a
                        className="friend"
                        href={`/user/${friend.id}`}
                        key={friend.id}
                    >
                        <img className="friend-pic" src={friend.image} />
                    </a>

                    <button
                        className="buttons"
                        onClick={() => dispatch(endFriendship(friend.id))}
                    >
                        unfriend
                    </button>
                </div>
            ))}
        </div>
    );

    const wannabeFriends = (
        <div className="wannabes">
            {wannabes.map(wannabe => (
                <div className="user" key={wannabe.id}>
                    <a
                        className="friend"
                        href={`/user/${wannabe.id}`}
                        key={wannabe.id}
                    >
                        <img className="friend-pic" src={wannabe.image} />
                    </a>

                    <button
                        className="buttons"
                        onClick={() =>
                            dispatch(acceptFriendRequest(wannabe.id))
                        }
                    >
                        accept
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="background">
            <div className="friends-container">
                <div id="friends">
                    <p className="header">Your friends</p>
                    {!friends.length && (
                        <p className="friend-status">You have no friends yet</p>
                    )}
                    {!!friends.length && acceptedFriends}
                </div>
                <div id="wannabes">
                    <p className="header">open friend requests</p>
                    {!wannabes.length && (
                        <p className="friend-status">
                            No friend requests at the moment
                        </p>
                    )}
                    {!!wannabes.length && wannabeFriends}
                </div>
            </div>
        </div>
    );
}
