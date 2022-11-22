import React, { useEffect, useState } from "react";
import classes from "./booking.module.css";
import DateChoice from "../../components/common/dateChoice/dateChoice";
import Button from "../../components/common/button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import { connect } from "react-redux";
import { setBookingAC } from "../../../redux/bookingReducer";
moment.locale("ru");

const Booking = ({ booking: bookingState, setBooking: setBookingToStore }) => {
    const [booking, setBooking] = useState(bookingState);
    const [activeCalendar, setActiveCalendar] = useState();
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
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
        setBookingToStore(booking);
    }, [booking.checkIn, booking.checkOut]);
    const handleClick = () => {
        setBookingToStore(booking);
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
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
                />
                <p>–</p>
                <DateChoice
                    choiceName="checkOut"
                    choiceValue={booking.checkOut}
                    onSetDate={handleSetDate}
                    checkInDate={booking.checkIn}
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
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
Booking.propTypes = {
    booking: PropTypes.object,
    setBooking: PropTypes.func
};

const mapStateToProps = ({ booking }) => ({
    booking
});

const mapDispatchToProps = (dispatch) => ({
    setBooking: (booking) => {
        dispatch(setBookingAC(booking));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
