const cngState = "CHANGE_STATE";

export const changeState = (event) => ({
    type: cngState,
    event
});

const onMainClickReducer = (state = false, action) => {
    switch (action.type) {
        case cngState:
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
