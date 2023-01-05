import React, { useEffect, useState } from "react";
import classes from "./editBooking.module.css";
import DateChoice from "../../common/dateChoice/dateChoice";
import Button from "../../common/button";
import { useParams, useHistory } from "react-router-dom";
import { personsForBooking as persons } from "../../../utils/selectFieldData";
import SelectField from "../../common/form/selectField";
import SpaceDiv from "../../common/spaceDiv";
import { useBookings } from "../../../hooks/useBookings";
import Loader from "../../common/loader/loader";
import { useAuth } from "../../../hooks/useAuth";
import "moment/locale/ru";
import moment from "moment";
import TextField from "../../common/form/textField";
import changePhone from "../../common/changePhone";
moment.locale("ru");

const EditBooking = () => {
    const history = useHistory();
    const initialState = {};
    const { currentUser } = useAuth();
    const isAdmin = currentUser._id === process.env.REACT_APP_ADMIN;
    const { bookingId } = useParams();
    const { getBookingById } = useBookings();
    const [booking, setBooking] = useState(initialState);
    const [activeCalendar, setActiveCalendar] = useState();
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
    const handleChange = (name, value, checkOutReset) => {
        if (checkOutReset) {
            setBooking({ ...booking, [name]: value, checkOut: "" });
        } else {
            setBooking({ ...booking, [name]: value });
        }
    };
    useEffect(() => {
        getBookingById(bookingId).then((result) => {
            localStorage.setItem("checkOut", String(result.checkOut));
            return setBooking(result);
        });
    }, []);
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalDays = (booking.checkOut - booking.checkIn) / 86400000;
            setBooking({ ...booking, totalDays });
        } else {
            setBooking({ ...booking, totalDays: "" });
        }
    }, [booking.checkIn, booking.checkOut, booking.persons]);

    const handleChangePhone = (name, value) => {
        setBooking((prevState) => ({
            ...prevState,
            [name]: changePhone(value)
        }));
    };

    const handleBack = () => {
        history.push(isAdmin ? "/admin" : "/my-bookings");
    };

    if (booking !== initialState) {
        if (currentUser._id !== booking.userId && !isAdmin) {
            return (
                <div className="warning">
                    Вы не можете изменять данное бронирование!
                </div>
            );
        } else if (Date.now() > Number(localStorage.getItem("checkOut"))) {
            return (
                <div className="warning">
                    Данное бронирование изменить невозможно!
                </div>
            );
        } else {
            return (
                <>
                    <div className="mainTitle">Изменить бронирование</div>
                    <div className={classes.bookingFormWrap}>
                        {Date.now() < booking.checkIn ? (
                            <DateChoice
                                choiceName="checkIn"
                                choiceValue={booking.checkIn}
                                onSetDate={handleChange}
                                checkOutDate={booking.checkOut}
                                activeCalendar={activeCalendar}
                                activateCalendar={activateCalendar}
                            />
                        ) : (
                            <div className={classes.staticCheckIn}>
                                {moment(booking.checkIn).format("D MMMM, ddd")}
                            </div>
                        )}

                        <p>–</p>
                        <DateChoice
                            choiceName="checkOut"
                            choiceValue={booking.checkOut}
                            onSetDate={handleChange}
                            checkInDate={booking.checkIn}
                            activeCalendar={activeCalendar}
                            activateCalendar={activateCalendar}
                        />
                        {booking.totalDays && (
                            <div className={classes.totalDays}>
                                Количество ночей:
                                <span className="fw600">
                                    {" "}
                                    {booking.totalDays}
                                </span>
                            </div>
                        )}
                    </div>
                    <SpaceDiv height="30" />
                    <SelectField
                        label="Количество человек"
                        options={persons}
                        defaultOption=""
                        name="persons"
                        value={booking.persons}
                        onChange={handleChange}
                        style={{
                            padding: "8px 10px",
                            border: "1px solid var(--header-bg-color)",
                            margin: "5px 0 0 10px",
                            fontWeight: "600"
                        }}
                    />
                    <SpaceDiv height="30" />
                    <div className={classes.phoneLabel}>Контактный телефон:</div>
                    <TextField
                        name="userPhone"
                        value={"+7 " + booking.userPhone}
                        onChange={handleChangePhone}
                        wrapStyle={{ justifyContent: "flex-start" }}
                        inputStyle={{
                            padding: "7px",
                            border: "1px solid var(--header-bg-color)",
                            width: "150px",
                            fontWeight: "600"
                        }}
                    />
                    <Button
                        color="blue"
                        onClick={handleBack}
                        disabled={!booking.totalDays || booking.userPhone.length !== 10}
                    >
                        Сохранить изменения
                    </Button>
                    <SpaceDiv height="30" />
                    <Button
                        color="grey"
                        onClick={handleBack}
                    >
                        Назад
                    </Button>
                </>
            );
        }
    } else {
        return <Loader />;
    }
};

export default EditBooking;
