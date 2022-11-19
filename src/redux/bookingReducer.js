const initialState = {
    checkIn: "",
    checkOut: ""
};

const setBooking = "SET_BOOKING";

export const setBookingAC = (booking) => ({
    type: setBooking,
    ...booking
});

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case setBooking:
            return {
                checkIn: action.checkIn,
                checkOut: action.checkOut,
                totalDays: action.totalDays
            };
        default:
            return state;
    }
};

export default bookingReducer;
