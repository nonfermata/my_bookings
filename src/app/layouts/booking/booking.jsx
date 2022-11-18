import React, { useEffect, useState } from "react";
import classes from "./booking.module.css";
import DateChoice from "../../components/common/dateChoice/dateChoice";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const Booking = () => {
    const [bookingData, setBookingData] = useState({});
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

    const handleSetDate = (key, date, checkOutReset) => {
        setBookingData((prevState) => ({ ...prevState, [key]: date }));
        if (checkOutReset) {
            setBookingData((prevState) => ({ ...prevState, checkOut: "" }));
        }
    };

    useEffect(() => {
        if (bookingData.checkIn && bookingData.checkOut) {
            const totalDays =
                (Date.parse(bookingData.checkOut) -
                    Date.parse(bookingData.checkIn)) /
                86400000;
            setBookingData((prevState) => ({ ...prevState, totalDays }));
        } else {
            setBookingData((prevState) => ({ ...prevState, totalDays: "" }));
        }
    }, [bookingData.checkIn, bookingData.checkOut]);

    useEffect(() => {
        const checkIn = bookingData.checkIn
            ? moment(bookingData.checkIn).format("D MMMM, ddd")
            : "Заезд";
        setCheckIn(checkIn);
        const checkOut = bookingData.checkOut
            ? moment(bookingData.checkOut).format("D MMMM, ddd")
            : "Выезд";
        setCheckOut(checkOut);
    }, [bookingData]);

    return (
        <>
            <div className="mainTitle">Введите данные своей поездки,</div>
            <div className={classes.subtitle}>
                и мы подберем для Вас лучшие номера!
            </div>
            <div className={classes.bookingFormWrap}>
                <DateChoice
                    choiceKey="checkIn"
                    choiceName={checkIn}
                    onSetDate={handleSetDate}
                    checkOutDate={bookingData.checkOut}
                />
                <p>–</p>
                <DateChoice
                    choiceKey="checkOut"
                    choiceName={checkOut}
                    onSetDate={handleSetDate}
                    checkInDate={bookingData.checkIn}
                />
                {bookingData.totalDays && (
                    <div className={classes.totalDays}>
                        Количество дней:
                        <span className="fw500"> {bookingData.totalDays}</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Booking;
