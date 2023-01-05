import React from "react";
import classes from "./admin.module.css";
import { useBookings } from "../../../hooks/useBookings";
import _ from "lodash";
import RoomExBrief from "../../ui/roomExBrief/roomExBrief";
import { useAuth } from "../../../hooks/useAuth";

const Admin = () => {
    const { updateBooking } = useAuth();
    const bookings = _.orderBy(useBookings().bookings, ["checkIn"]);
    const handleEdit = async (booking) => {
        await updateBooking(booking);
    };

    return (
        <>
            <div className="mainTitle">Панель администратора</div>
            <div className={classes.adminWrap}>
                {bookings.map((item) => (
                    <RoomExBrief
                        key={item._id}
                        admin
                        onEdit={handleEdit}
                        booking={item}
                    />
                ))}
            </div>
        </>
    );
};

export default Admin;
