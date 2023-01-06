/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useBookings } from "../../../hooks/useBookings";
import { useAuth } from "../../../hooks/useAuth";
import _ from "lodash";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";
import classes from "./myBookings.module.css";
import Loader from "../../common/loader/loader";

const MyBookings = () => {
    const { currentUser } = useAuth();
    const [bookings, setBookings] = useState();
    const { getBookings } = useBookings();
    useEffect(() => {
        getBookings().then((result) => {
            if (result) {
                const myBookings = result.filter(
                    (item) => item.userId === currentUser._id
                );
                setBookings(_.orderBy(myBookings, ["checkIn"]));
            } else {
                setBookings([]);
            }
        });
    }, []);

    if (bookings) {
        return (
            <>
                <div className="mainTitle">Мои бронирования</div>
                {bookings.length !== 0 ? (
                    <div className={classes.bookingsWrap}>
                        {bookings.map((item) => (
                            <RoomExBrief
                                key={item._id}
                                id={item._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={classes.noBookings}>
                        Вы пока ничего не бронировали.
                    </div>
                )}
            </>
        );
    } else {
        return <Loader />;
    }
};

export default MyBookings;
