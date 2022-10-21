import React, { useEffect, useState } from "react";
import Loader from "../../../utils/loader";
import classes from "./rooms.module.css";
import RoomBrief from "../roomBrief/roomBrief";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3001/rooms")
                .then((response) => response.json())
                .then((data) => setRooms(data));
        }, 700);
    }, []);
    if (rooms) {
        return (
            <>
                <div className="mainTitle">Наши номера</div>
                <div className={classes.roomsWrap}>
                    {rooms.map((room) => (
                        <Link
                            className={classes.roomLink}
                            key={room.id}
                            to={"/rooms/" + room.id}
                        >
                            <RoomBrief {...room} />
                        </Link>
                    ))}
                </div>
            </>
        );
    }
    return <Loader />;
};

export default Rooms;
