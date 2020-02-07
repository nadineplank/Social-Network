export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };

        // immutable methods for making changes to redux:

        // map - good for changing item(s) in an array
        // filter - removes an item(s) from an array
        // concat - combine two or more arrays into one array
        // ... (spread operater) - copy arrays and objects and add propeerties to those copies
        // Object.assign - make copies of objects
    }
    if (action.type == "ACCEPT_FRIEND_REQ" || action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: action.type == "ACCEPT_FRIEND_REQ"
                    };
                }
                return friend;
            })
        };
    }
    return state;
}
