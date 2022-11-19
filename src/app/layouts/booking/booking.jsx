import React, { useEffect, useState } from "react";
import classes from "./booking.module.css";
import DateChoice from "../../components/common/dateChoice/dateChoice";
import moment from "moment";
import "moment/locale/ru";
import Button from "../../components/common/button";
import { Link } from "react-router-dom";
moment.locale("ru");

const Booking = () => {
    const [booking, setBooking] = useState({
        checkIn: "",
        checkOut: "",
        totalDays: ""
    });
    // const [checkInString, setCheckInString] = useState();
    // const [checkOutString, setCheckOutString] = useState();

    const handleSetDate = (key, date, checkOutReset) => {
        setBooking((prevState) => ({ ...prevState, [key]: date }));
        if (checkOutReset) {
            setBooking((prevState) => ({ ...prevState, checkOut: "" }));
        }
    };
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalDays = (booking.checkOut - booking.checkIn) / 86400000;
            setBooking((prevState) => ({ ...prevState, totalDays }));
        } else {
            setBooking((prevState) => ({ ...prevState, totalDays: "" }));
        }
    }, [booking.checkIn, booking.checkOut]);
    const handleClick = () => {
        console.log(booking);
    };

    return (
        <>
            <div className="mainTitle">Введите данные своей поездки,</div>
            <div className={classes.subtitle}>
                и мы подберем для Вас лучшие номера!
            </div>
            <div className={classes.bookingFormWrap}>
                <DateChoice
                    choiceName="checkIn"
                    choiceValue={booking.checkIn}
                    onSetDate={handleSetDate}
                    checkOutDate={booking.checkOut}
                />
                <p>–</p>
                <DateChoice
                    choiceName="checkOut"
                    choiceValue={booking.checkOut}
                    onSetDate={handleSetDate}
                    checkInDate={booking.checkIn}
                />
                {booking.totalDays && (
                    <>
                        <div className={classes.totalDays}>
                            Количество ночей:
                            <span className="fw500"> {booking.totalDays}</span>
                        </div>
                        <Link to="/rooms">
                            <Button
                                color="blue"
                                onClick={handleClick}
                            >
                                Выбрать номер
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Booking;
