import React, { useEffect, useRef, useState } from "react";
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
import { useRooms } from "../../../hooks/useRooms";
import getWordByNumber from "../../../utils/getWordByNumber";
import _ from "lodash";
import { toast } from "react-toastify";
moment.locale("ru");

const EditBooking = () => {
    const [isChanged, setIsChanged] = useState(false);
    const history = useHistory();
    const ref = useRef({});
    const { getRoomById } = useRooms();
    const { currentUser } = useAuth();
    const isAdmin = currentUser._id === process.env.REACT_APP_ADMIN;
    const { getRoomBookings, getBookingById, updateBooking } = useBookings();
    const { bookingId } = useParams();
    const [booking, setBooking] = useState({});
    const [activeCalendar, setActiveCalendar] = useState();
    const [occupiedDates, setOccupiedDates] = useState();
    const [maxPersonsClass, setMaxPersonsClass] = useState("hidden");
    const dateNow = Date.now();
    useEffect(() => {
        getBookingById(bookingId).then((result) => {
            ref.current.checkIn = result.checkIn;
            ref.current.checkOut = result.checkOut;
            return setBooking(result);
        });
    }, []);
    const isStaticCheckIn = dateNow > ref.current.checkIn;
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
    const handleChange = (name, value, reset) => {
        if (reset) {
            setBooking({ ...booking, [name]: value, [reset]: "" });
        } else {
            setBooking({ ...booking, [name]: value });
        }
        if (!isChanged) {
            setIsChanged(true);
        }
    };

    useEffect(() => {
        if (booking) {
            getRoomBookings(booking.roomId).then((result) => {
                const filteredBookings = result.filter(
                    (item) => item._id !== bookingId && item.status === "ok"
                );
                const orderedBookings = _.orderBy(filteredBookings, [
                    "checkIn"
                ]);
                setOccupiedDates(
                    orderedBookings.map(({ checkIn, checkOut }) => ({
                        checkIn,
                        checkOut
                    }))
                );
            });
        }
    }, [booking._id]);
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalNights = (booking.checkOut - booking.checkIn) / 86400000;
            setBooking({ ...booking, totalNights });
        } else {
            setBooking({ ...booking, totalNights: "" });
        }
    }, [booking.checkIn, booking.checkOut, booking.persons]);

    const handleChangePhone = (name, value) => {
        setBooking((prevState) => ({
            ...prevState,
            [name]: changePhone(value)
        }));
        if (!isChanged) {
            setIsChanged(true);
        }
    };

    const handleBack = () => {
        history.push(isAdmin ? "/admin" : "/my-bookings");
    };

    const handleSubmit = async () => {
        await updateBooking(booking);
        toast.success("???????? ???????????????????????? ?????????????? ???????????????? ????", {
            position: "top-right"
        });
        history.push(isAdmin ? "/admin" : "/my-bookings");
    };
    if (booking._id && occupiedDates) {
        if (currentUser._id !== booking.userId && !isAdmin) {
            return (
                <div className="warning">
                    ???? ???? ???????????? ???????????????? ???????????? ????????????????????????!
                </div>
            );
        } else if (dateNow > ref.current.checkOut || booking.status !== "ok") {
            return (
                <div className="warning">
                    ???????????? ???????????????????????? ???????????????? ????????????????????!
                </div>
            );
        } else {
            const room = getRoomById(booking.roomId);
            const getPersons = () => {
                if (booking.persons > room.capacity) {
                    setMaxPersonsClass("");
                    setBooking((prevState) => ({
                        ...prevState,
                        persons: String(room.capacity)
                    }));
                    return String(room.capacity);
                } else {
                    return booking.persons;
                }
            };
            return (
                <>
                    <div className="mainTitle">???????????????? ????????????????????????</div>
                    <div className={classes.datesWrap}>
                        {isStaticCheckIn ? (
                            <div className={classes.staticCheckIn}>
                                {moment(booking.checkIn).format("D MMMM, ddd")}
                            </div>
                        ) : (
                            <DateChoice
                                occupiedDates={occupiedDates}
                                choiceName="checkIn"
                                choiceValue={booking.checkIn}
                                onSetDate={handleChange}
                                checkOutDate={booking.checkOut}
                                activeCalendar={activeCalendar}
                                activateCalendar={activateCalendar}
                            />
                        )}

                        <p>???</p>
                        <DateChoice
                            isStaticCheckIn={isStaticCheckIn}
                            occupiedDates={occupiedDates}
                            choiceName="checkOut"
                            choiceValue={booking.checkOut}
                            onSetDate={handleChange}
                            checkInDate={booking.checkIn}
                            activeCalendar={activeCalendar}
                            activateCalendar={activateCalendar}
                        />
                    </div>
                    <div className={classes.imgAndTitleWrap}>
                        <div className={classes.imgWrap}>
                            <img
                                className={classes.image}
                                src={room.mainPhoto}
                                alt="photo"
                            />
                        </div>
                        <div>
                            <h1 className={classes.roomTitle}>{room.name}</h1>
                            <div className={classes.totalPrice}>
                                {booking.totalNights ? (
                                    <>
                                        <span className="fw600">
                                            ${room.price * booking.totalNights}
                                        </span>{" "}
                                        ???? {booking.totalNights}{" "}
                                        {getWordByNumber(
                                            booking.totalNights,
                                            "????????"
                                        )}
                                    </>
                                ) : (
                                    ". . ."
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={classes.personsWrap}>
                        <SelectField
                            label="???????????????????? ????????????"
                            options={persons}
                            defaultOption=""
                            name="persons"
                            value={getPersons()}
                            onChange={handleChange}
                            style={{
                                padding: "8px 10px",
                                border: "1px solid var(--base-blue-color)",
                                margin: "5px 0 0 10px",
                                fontWeight: "600"
                            }}
                        />
                        <div
                            className={
                                classes.maxPersons + " " + maxPersonsClass
                            }
                        >
                            ???????????????????????? ?????????????????????? ???????????? ??? {room.capacity}{" "}
                            {getWordByNumber(room.capacity, "????????")}
                        </div>
                    </div>
                    <SpaceDiv height="30" />
                    <div className={classes.phoneLabel}>
                        ???????????????????? ??????????????:
                    </div>
                    <TextField
                        name="userPhone"
                        value={"+7 " + booking.userPhone}
                        onChange={handleChangePhone}
                        wrapStyle={{ justifyContent: "flex-start" }}
                        inputStyle={{
                            padding: "7px",
                            border: "1px solid var(--base-blue-color)",
                            width: "150px",
                            fontWeight: "600"
                        }}
                    />
                    <Button
                        color="blue"
                        onClick={handleSubmit}
                        disabled={
                            !booking.totalNights ||
                            booking.userPhone.length !== 10 ||
                            !isChanged
                        }
                    >
                        ?????????????????? ??????????????????
                    </Button>
                    <SpaceDiv height="30" />
                    <Button
                        color="grey"
                        onClick={handleBack}
                    >
                        ??????????
                    </Button>
                </>
            );
        }
    } else {
        return <Loader />;
    }
};

export default EditBooking;
