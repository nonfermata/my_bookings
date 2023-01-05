const changeState = "CHANGE_STATE";

export const onMainClick = (event) => ({
    type: changeState,
    event
});

const onMainClickReducer = (state = false, action) => {
    switch (action.type) {
        case changeState:
            action.event.stopPropagation();
            if (
                action.event.target.tagName !== "svg" &&
                action.event.target.tagName !== "path"
            ) {
                if (
                    !action.event.target.className.includes("dateChoice") &&
                    !action.event.target.className.includes("profile")
                ) {
                    return !state;
                } else return state;
            } else return state;
        default:
            return state;
    }
};
export default onMainClickReducer;
