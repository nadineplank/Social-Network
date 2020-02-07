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
    // TODO write more code here
    const acceptedFriends = (
        <div className="users">
            {friends.map(friend => (
                <div className="user" key={friend.id}>
                    <a
                        className="newUser"
                        href={`/user/${friend.id}`}
                        key={friend.id}
                    >
                        <img src={friend.image} />
                    </a>
                    <div className="buttons">
                        <button
                            onClick={() => dispatch(endFriendship(friend.id))}
                        >
                            end friendship
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const wannabeFriends = (
        <div className="users">
            {wannabes.map(wannabe => (
                <div className="user" key={wannabe.id}>
                    <a
                        className="newUser"
                        href={`/user/${wannabe.id}`}
                        key={wannabe.id}
                    >
                        <img src={wannabe.image} />
                    </a>
                    <div className="buttons">
                        <button
                            onClick={() =>
                                dispatch(acceptFriendRequest(wannabe.id))
                            }
                        >
                            accept friend request
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div id="friends">
                {!friends.length && <div>You have no friends yet!</div>}
                {!!friends.length && acceptedFriends}
            </div>
            <div id="wannabes">
                {!wannabes.length && (
                    <div>No friend requests at the moment!</div>
                )}
                {!!wannabes.length && wannabeFriends}
            </div>
        </div>
    );
}
