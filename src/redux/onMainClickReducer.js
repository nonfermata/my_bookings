import { createAction } from "@reduxjs/toolkit";

const onClick = createAction("onMainClick");

export const onMainClick = (event) => onClick(event);

const onMainClickReducer = (state = false, action) => {
    switch (action.type) {
        case onClick.type:
            action.payload.stopPropagation();
            if (
                action.payload.target.tagName !== "svg" &&
                action.payload.target.tagName !== "path"
            ) {
                if (
                    !action.payload.target.className.includes("dateChoice") &&
                    !action.payload.target.className.includes("profile")
                ) {
                    return !state;
                }
            }
            return state;
        default:
            return state;
    }
};

export default onMainClickReducer;
