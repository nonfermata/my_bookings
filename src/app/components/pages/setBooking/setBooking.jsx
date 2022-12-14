import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import RoomBrief from "../../ui/roomBrief/roomBrief";
import classes from "./setBooking.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import Button from "../../common/button";
import { useAuth } from "../../../hooks/useAuth";
import TextField from "../../common/form/textField";
import SpaceDiv from "../../common/spaceDiv";
import { useBookings } from "../../../hooks/useBookings";
import { useRooms } from "../../../hooks/useRooms";
import { resetBooking } from "../../../../redux/bookingReducer";
import changePhone from "../../common/changePhone";
import Loader from "../../common/loader/loader";

moment.locale("ru");

const SetBooking = ({ booking, resetBooking }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const { roomId } = useParams();
    const room = useRooms().getRoomById(roomId);
    const { getRoomBookings, createBooking } = useBookings();
    const [roomBookings, setRoomBookings] = useState();
    useEffect(() => {
        if (Object.values(booking).some((item) => item === "")) {
            history.push("/");
        }
        getRoomBookings(roomId).then((result) => setRoomBookings(result));
    }, []);

    const errorBookingMessage = () => {
        if (room.capacity < booking.persons) {
            return "Количество человек больше вместимости номера. Измените количество человек или выберите другой номер.";
        }
        for (const item of roomBookings) {
            if (
                item.status === "ok" &&
                booking.checkIn < item.checkOut &&
                booking.checkOut > item.checkIn
            ) {
                return "На выбранные даты этот номер занят. Измените даты поездки или выберите другой номер.";
            }
        }
    };

    const [bookingData, setBookingData] = useState({
        userId: currentUser._id,
        userPhone: "",
        roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        persons: booking.persons
    });

    const handleChangePhone = (name, value) => {
        setBookingData((prevState) => ({
            ...prevState,
            [name]: changePhone(value)
        }));
    };

    const handleSubmitBooking = async () => {
        const booking = {
            ...bookingData,
            status: "ok",
            _id: String(Date.now())
        };
        try {
            await createBooking(booking);
            resetBooking();
            history.push("/success-booking/" + booking._id);
        } catch (e) {
            console.log(e.message);
        }
    };
    if (roomBookings) {
        if (!errorBookingMessage()) {
            return (
                <>
                    <div className="mainTitle">Вы бронируете номер:</div>
                    <div className={classes.setBookingWrap}>
                        <RoomBrief {...room} />
                        <div className={classes.detailsWrap}>
                            <h1 className={classes.title}>Ваша поездка</h1>
                            <p>
                                Заезд:{" "}
                                <span className="fw600">
                                    {moment(booking.checkIn).format(
                                        "D MMMM YYYY"
                                    )}
                                </span>
                            </p>
                            <p>
                                Выезд:{" "}
                                <span className="fw600">
                                    {moment(booking.checkOut).format(
                                        "D MMMM YYYY"
                                    )}
                                </span>
                            </p>
                            <p>
                                Количество ночей:{" "}
                                <span className="fw600">
                                    {booking.totalNights}
                                </span>
                            </p>
                            <p>
                                Количество человек:{" "}
                                <span className="fw600">{booking.persons}</span>
                            </p>
                            <p>
                                Общая стоимость:{" "}
                                <span className="fw600">
                                    {"$" +
                                        Number(booking.totalNights) *
                                            Number(room.price)}
                                </span>
                            </p>
                            <SpaceDiv height="20" />
                            <h1 className={classes.title}>Ваши данные</h1>
                            <p>
                                Имя:
                                <br />
                                <span className="fw600">
                                    {currentUser.name}
                                </span>
                            </p>
                            <p>
                                E-mail:
                                <br />
                                <span className="fw600">
                                    {currentUser.email}
                                </span>
                            </p>
                            <p style={{ marginBottom: "5px" }}>
                                Контактный телефон:{" "}
                            </p>
                            <TextField
                                name="userPhone"
                                value={"+7 " + bookingData.userPhone}
                                onChange={handleChangePhone}
                                wrapStyle={{ justifyContent: "flex-start" }}
                                inputStyle={{
                                    padding: "7px",
                                    width: "150px",
                                    fontWeight: "600"
                                }}
                            />
                            <Link to="/">
                                <Button color="blue">
                                    Изменить бронирование
                                </Button>
                            </Link>
                            <SpaceDiv height="30" />
                            <Button
                                color="green"
                                onClick={handleSubmitBooking}
                                disabled={bookingData.userPhone.length !== 10}
                            >
                                Подтвердить бронирование
                            </Button>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="mainTitle">
                        Данное бронирование, к сожалению, невозможно.
                    </div>
                    <div className={classes.errorMessage}>
                        {errorBookingMessage()}
                    </div>
                    <Link to="/booking">
                        <Button color="blue">Изменить бронирование</Button>
                    </Link>
                </>
            );
        }
    } else {
        return <Loader />;
    }
};

SetBooking.propTypes = {
    booking: PropTypes.object,
    resetBooking: PropTypes.func
};

const mapStateToProps = ({ booking }) => ({
    booking
});

const mapDispatchToProps = { resetBooking };

export default connect(mapStateToProps, mapDispatchToProps)(SetBooking);
