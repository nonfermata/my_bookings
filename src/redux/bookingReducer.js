import { createAction } from "@reduxjs/toolkit";

const initialState = { persons: "" };

const set = createAction("booking/set-booking");
const reset = createAction("booking/reset");

export const setBooking = (booking) => set(booking);
export const resetBooking = () => reset();

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case set.type:
            return { ...action.payload };
        case reset.type:
            return initialState;
        default:
            return state;
    }
};

export default bookingReducer;
