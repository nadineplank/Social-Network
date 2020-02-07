import axios from "./axios";
//axios requests to server
// ALL action creaters will return objects that have a type property
// ALL types shoulde be written all-caps with underscores
// ALL_CAPS_WITH_UNDERSCORES

// 1. receiveFriendsWannabes: will make GET to the server to retrieve the list of friends and wannabes
// note: that if you receive an empty array from the server, it means your server messed up, or, more likely, you have no friends :(
export async function receiveFriendsWannabes() {
    //TODO write more code here
    const { data } = await axios.get("/friends-wannabe");
    // should return an action that has a type property, and a friendsWannabes property whose value is set to the array of friends or wannabes from the server
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

// 2. acceptFriendRequest: will make POST request to server to accept the friendship. The function should return an action with type property and the id of the user whose friendship was accepted
export async function acceptFriendRequest(id) {
    await axios.post("/accept-friend-request/" + id);
    return {
        type: "ACCEPT_FRIEND_REQ",
        id
    };
}

// 3. unfriend: will make POST request to server to end the friendship. It should return an object that has type and the id of the user whose friendship was ended
export async function endFriendship(id) {
    await axios.post("/end-friendship/" + id);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}
