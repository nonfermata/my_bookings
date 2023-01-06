import React, { useEffect, useState } from "react";
import classes from "./admin.module.css";
import { useBookings } from "../../../hooks/useBookings";
import _ from "lodash";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";
import Loader from "../../common/loader/loader";

const Admin = () => {
    const [bookings, setBookings] = useState();
    const { getBookings } = useBookings();
    useEffect(() => {
        getBookings().then((result) => {
            if (result) {
                setBookings(_.orderBy(result, ["checkIn"]));
            } else {
                setBookings([]);
            }
        });
    }, []);
    if (bookings) {
        return (
            <>
                <div className="mainTitle">Панель администратора</div>
                {bookings.length !== 0 ? (
                    <div className={classes.adminWrap}>
                        {bookings.map((item) => (
                            <RoomExBrief
                                key={item._id}
                                id={item._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={classes.noBookings}>
                        Пока никто ничего не забронировал.
                    </div>
                )}
            </>
        );
    } else {
        return <Loader />;
    }
};

export default Admin;
