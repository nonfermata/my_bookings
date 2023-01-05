/* eslint-disable indent */
import React from "react";
import { useBookings } from "../../../hooks/useBookings";
import { useAuth } from "../../../hooks/useAuth";
import _ from "lodash";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";
import classes from "./myBookings.module.css";

const MyBookings = () => {
    const { currentUser } = useAuth();
    const bookings = useBookings().bookings
        ? useBookings().bookings.filter(
              (item) => item.userId === currentUser._id
          )
        : [];
    const orderedBookings = _.orderBy(bookings, ["checkIn"]);

    return (
        <>
            <div className="mainTitle">Мои бронирования</div>
            {orderedBookings.length !== 0 ? (
                orderedBookings.map((item) => (
                    <RoomExBrief
                        key={item._id}
                        {...item}
                    />
                ))
            ) : (
                <div className={classes.noBookings}>
                    Вы пока ничего не бронировали.
                </div>
            )}
        </>
    );
};

export default MyBookings;
