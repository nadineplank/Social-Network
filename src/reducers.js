export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
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
