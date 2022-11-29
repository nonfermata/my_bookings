const initialState = {
    checkIn: "",
    checkOut: ""
};

const setBook = "SET_BOOKING";

export const setBooking = (booking) => ({
    type: setBook,
    booking
});

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case setBook:
            return { ...action.booking };
        default:
            return state;
    }
};

export default bookingReducer;
