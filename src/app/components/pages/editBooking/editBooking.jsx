import React from "react";
import classes from "./editBooking.module.css";
import { useParams } from "react-router-dom";
import { useRooms } from "../../../hooks/useRooms";
import { useBookings } from "../../../hooks/useBookings";

const EditBooking = () => {
    const { bookingId } = useParams();
    const { rooms } = useRooms();
    const { bookings } = useBookings();
    const booking = bookings.find((item) => item._id === bookingId);
    const room = rooms.find((item) => item._id === booking.roomId);

    return (
        <>
            <div className="mainTitle">Управлять бронированием</div>
            <div className={classes.editWrap}>Edit booking {room.name}</div>
        </>
    );
};

export default EditBooking;
