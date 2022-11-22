const changeState = "CHANGE_STATE";

export const changeStateAC = (event) => ({
    type: changeState,
    event
});

const onMainClickReducer = (state = false, action) => {
    switch (action.type) {
        case changeState:
            action.event.stopPropagation();
            if (action.event.target.tagName !== "svg" && action.event.target.tagName !== "path") {
                if (!action.event.target.className.includes("dateChoice")) {
                    return !state;
                } else return state;
            } else return state;
        default:
            return state;
    }
};

export default onMainClickReducer;
