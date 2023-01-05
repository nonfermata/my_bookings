import React, { useEffect, useState } from "react";
import classes from "./roomExBrief.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import Button from "../../common/button";
import { Link } from "react-router-dom";
import { useRooms } from "../../../hooks/useRooms";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../common/loader/loader";
moment.locale("ru");

const RoomExBrief = ({
    _id,
    checkIn,
    checkOut,
    persons,
    roomId,
    status,
    userId,
    userPhone,
    admin
}) => {
    const [user, setUser] = useState();
    const { getUserById } = useAuth();
    const extStatus = {};
    if (status === "ok") {
        const date = Date.now();
        if (date < checkIn) {
            extStatus.name = "предстоящее";
            extStatus.value = "upcoming";
        } else if (date >= checkIn && date <= checkOut) {
            extStatus.name = "сейчас";
            extStatus.value = "now";
        } else {
            extStatus.name = "завершено";
            extStatus.value = "completed";
        }
    } else if (status === "userCancelled") {
        extStatus.name = "отменено пользователем";
        extStatus.value = "userCancelled";
    } else {
        extStatus.name = "отменено администратором";
        extStatus.value = "adminCancelled";
    }
    const room = useRooms().rooms.find((item) => item._id === roomId);

    useEffect(() => {
        getUserById(userId).then((result) => setUser(result));
    }, []);

    const getPersonsString = (value) => {
        if (value === "1") {
            return "гость";
        } else if (value === "5") {
            return "гостей";
        } else {
            return "гостя";
        }
    };

    if (user) {
        return (
            <div className={classes.bookingWrap}>
                <div
                    className={classes.status + " " + classes[extStatus.value]}
                >
                    {extStatus.name}
                </div>
                <div className={classes.datesAndPersonsWrap}>
                    <div className={classes.dates}>
                        {moment(checkIn).format("DD.MM.YYYY") +
                            " - " +
                            moment(checkOut).format("DD.MM.YYYY")}
                    </div>
                    |
                    <div className={classes.persons}>
                        {persons} {getPersonsString(persons)}
                    </div>
                </div>
                <div className={classes.imgAndDecrWrap}>
                    <div className={classes.imgWrap}>
                        <img
                            className={classes.image}
                            src={room.mainPhoto}
                            alt="photo"
                        />
                    </div>
                    <div className={classes.description}>
                        <h1 className={classes.title}>{room.name}</h1>
                        {admin ? (
                            <>
                                <h2 className={classes.userTitle}>
                                    Контактное лицо:
                                </h2>
                                <p className={classes.userItem}>
                                    Имя:{" "}
                                    <span className="fw600">{user.name}</span>
                                </p>
                                <p className={classes.userItem}>
                                    E-mail:{" "}
                                    <span className="fw600">{user.email}</span>
                                </p>
                                <p className={classes.userItem}>
                                    Телефон:{" "}
                                    <span className="fw600">
                                        {"+7 " + userPhone}
                                    </span>
                                </p>
                                {(extStatus.value === "upcoming" ||
                                    extStatus.value === "now") && (
                                    <p
                                        className={classes.cancelBooking}
                                        title="Отменить бронирование"
                                    >
                                        Отменить бронирование
                                    </p>
                                )}
                            </>
                        ) : (
                            <Link to={"/edit-booking/" + _id}>
                                <Button color="blue">
                                    Управлять бронированием
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader size="small" />;
    }
};

RoomExBrief.propTypes = {
    _id: PropTypes.string,
    checkIn: PropTypes.number,
    checkOut: PropTypes.number,
    persons: PropTypes.string,
    roomId: PropTypes.string,
    status: PropTypes.string,
    userId: PropTypes.string,
    userPhone: PropTypes.string,
    admin: PropTypes.bool
};

export default RoomExBrief;
