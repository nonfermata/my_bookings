import { connect } from "react-redux";
import Booking from "./booking";
import { setBookingAC } from "../../../redux/bookingReducer";

const mapStateToProps = (state) => ({
    bookingState: state.bookingState
});

const mapDispatchToProps = (dispatch) => ({
    setBookingState: (booking) => {
        dispatch(setBookingAC(booking));
    }
});

const BookingContainer = connect(mapStateToProps, mapDispatchToProps)(Booking);

export default BookingContainer;
