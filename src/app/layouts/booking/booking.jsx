import React, { useEffect, useState } from "react";
import classes from "./booking.module.css";
import DateChoice from "../../components/common/dateChoice/dateChoice";
import moment from "moment";
import "moment/locale/ru";
import Button from "../../components/common/button";
import { Link } from "react-router-dom";
moment.locale("ru");

const Booking = () => {
    const [booking, setBooking] = useState({});
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

    const handleSetDate = (key, date, checkOutReset) => {
        setBooking((prevState) => ({ ...prevState, [key]: date }));
        if (checkOutReset) {
            setBooking((prevState) => ({ ...prevState, checkOut: "" }));
        }
    };
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalDays =
                (Date.parse(booking.checkOut) - Date.parse(booking.checkIn)) /
                86400000;
            setBooking((prevState) => ({ ...prevState, totalDays }));
        } else {
            setBooking((prevState) => ({ ...prevState, totalDays: "" }));
        }
    }, [booking.checkIn, booking.checkOut]);
    useEffect(() => {
        const checkIn = booking.checkIn
            ? moment(booking.checkIn).format("D MMMM, ddd")
            : "Заезд";
        setCheckIn(checkIn);
        const checkOut = booking.checkOut
            ? moment(booking.checkOut).format("D MMMM, ddd")
            : "Выезд";
        setCheckOut(checkOut);
    }, [booking]);

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
                    checkOutDate={booking.checkOut}
                />
                <p>–</p>
                <DateChoice
                    choiceKey="checkOut"
                    choiceName={checkOut}
                    onSetDate={handleSetDate}
                    checkInDate={booking.checkIn}
                />
                {booking.totalDays && (
                    <>
                        <div className={classes.totalDays}>
                            Количество дней:
                            <span className="fw500"> {booking.totalDays}</span>
                        </div>
                        <Link to="/rooms">
                            <Button color="blue">Выбрать номер</Button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Booking;
