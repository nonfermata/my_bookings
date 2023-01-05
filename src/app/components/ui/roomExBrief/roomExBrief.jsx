import React, { useEffect, useState } from "react";
import classes from "./roomExBrief.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import { useRooms } from "../../../hooks/useRooms";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../common/loader/loader";
import PopupSubmit from "../../common/popupSubmit/popupSubmit";
import { useBookings } from "../../../hooks/useBookings";
import { Link } from "react-router-dom";
moment.locale("ru");

const RoomExBrief = ({ booking, admin }) => {
    const {
        _id,
        checkIn,
        checkOut,
        persons,
        roomId,
        status,
        userId,
        userPhone
    } = booking;
    const [user, setUser] = useState();
    const { updateBooking } = useBookings();
    const { getUserById } = useAuth();
    const room = useRooms().getRoomById(roomId);
    const [isPopup, setIsPopup] = useState(false);
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
    const isEdit = extStatus.value === "upcoming" || extStatus.value === "now";

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

    const handleCancelBooking = () => {
        setIsPopup(true);
    };

    const onSubmitCancellation = async () => {
        await updateBooking({
            ...booking,
            status: admin ? "adminCancelled" : "userCancelled"
        });
        setIsPopup(false);
    };

    const onExit = () => {
        setIsPopup(false);
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
                        <h1 className={classes.roomTitle}>{room.name}</h1>
                        {admin && (
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
                            </>
                        )}
                        {isEdit && (
                            <div className={classes.editWrap}>
                                <Link to={"edit-booking/" + _id}>
                                    <p
                                        className={
                                            classes.edit +
                                            " " +
                                            classes.editBooking
                                        }
                                        title="Редактировать"
                                    >
                                        Редактировать
                                    </p>
                                </Link>
                                <p
                                    className={
                                        classes.edit +
                                        " " +
                                        classes.cancelBooking
                                    }
                                    title="Отменить бронирование"
                                    onClick={handleCancelBooking}
                                >
                                    Отменить бронирование
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {isPopup && (
                    <PopupSubmit
                        onSubmit={onSubmitCancellation}
                        onExit={onExit}
                    >
                        Вы уверены, что хотите отменить это бронирование?
                    </PopupSubmit>
                )}
            </div>
        );
    } else {
        return <Loader size="small" />;
    }
};

RoomExBrief.propTypes = {
    booking: PropTypes.object,
    admin: PropTypes.bool
};

export default RoomExBrief;
