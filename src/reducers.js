export default function reducer(state = {}, action) {
    if (action.type === "ALL_CAPS_WITH_UNDERSCORES") {
        state = {
            ...state,
            friendsWannabes: "yoo"
        };
    }

    return state;
}
