import React from "react";
import { useParams } from "react-router-dom";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";
import { useBookings } from "../../../hooks/useBookings";

const SuccessBooking = () => {
    const { bookingId } = useParams();
    const { bookings } = useBookings();
    const booking = bookings.find((item) => item._id === bookingId);
    return (
        <>
            <div className="mainTitle green">
                Поздравляем, Ваше бронирование подтверждено!
            </div>
            <RoomExBrief {...booking} />
        </>
    );
};

export default SuccessBooking;
