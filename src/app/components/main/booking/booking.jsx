import React, { useEffect, useState } from "react";
// import classes from "./booking.module.css";
import DateChoice from "../../common/dateChoice/dateChoice";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const Booking = () => {
    const [bookingData, setBookingData] = useState({});
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

    const handleSetDate = (key, date, opositeKey) => {
        setBookingData((prevState) => ({ ...prevState, [key]: date }));
        if (opositeKey) setBookingData((prevState) => ({ ...prevState, [opositeKey]: "" }));
    };

    useEffect(() => {
        const checkIn = bookingData.checkIn
            ? moment(bookingData.checkIn).format("D MMMM, ddd")
            : "Заезд";
        setCheckIn(checkIn);
        const checkOut = bookingData.checkOut
            ? moment(bookingData.checkOut).format("D MMMM, ddd")
            : "Выезд";
        setCheckOut(checkOut);
        console.log(bookingData);
    }, [bookingData]);

    return (
        <>
            <DateChoice
                choiceKey="checkIn"
                choiceName={checkIn}
                onSetDate={handleSetDate}
                checkOutDate={bookingData.checkOut}
            />
            <DateChoice
                choiceKey="checkOut"
                choiceName={checkOut}
                onSetDate={handleSetDate}
                checkInDate={bookingData.checkIn}
            />
        </>
    );
};

export default Booking;
