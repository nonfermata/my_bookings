const initialState = { persons: "" };

const SET_BOOKING = "SET_BOOKING";
const RESET_BOOKING = "RESET_BOOKING";

export const setBooking = (booking) => ({
    type: SET_BOOKING,
    booking
});

export const resetBooking = () => ({
    type: RESET_BOOKING
});

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKING:
            return { ...action.booking };
        case RESET_BOOKING:
            return initialState;
        default:
            return state;
    }
};

export default bookingReducer;
