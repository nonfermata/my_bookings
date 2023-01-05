import React from "react";
import classes from "./admin.module.css";
import { useBookings } from "../../../hooks/useBookings";
import _ from "lodash";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";

const Admin = () => {
    const bookings = _.orderBy(useBookings().bookings, ["checkIn"]);

    return (
        <>
            <div className="mainTitle">Панель администратора</div>
            <div className={classes.adminWrap}>
                {bookings.map((item) => (
                    <RoomExBrief
                        key={item._id}
                        admin
                        {...item}
                    />
                ))}
            </div>
        </>
    );
};

export default Admin;
