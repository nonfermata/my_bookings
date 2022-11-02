import React, { useEffect, useState } from "react";
import Loader from "../../../utils/loader/loader";
import classes from "./rooms.module.css";
import RoomBrief from "../roomBrief/roomBrief";
import api from "../../../../my-api";

const Rooms = () => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        api.rooms.fetchAll().then((data) => setRooms(data));
    }, []);
    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch("http://localhost:3001/rooms")
    //             .then((response) => response.json())
    //             .then((data) => setRooms(data));
    //     }, 700);
    // }, []);

    const handleDeleteRoom = (id) => {
        setRooms((rooms) => rooms.filter((room) => room.id !== id));
    };

    if (rooms) {
        return (
            <>
                <div className="mainTitle">Наши номера</div>
                <div className={classes.roomsWrap}>
                    {rooms.map((room) => (
                        <RoomBrief
                            key={room.id}
                            {...room}
                            from="rooms"
                            deleteRoom={handleDeleteRoom}
                        />
                    ))}
                </div>
            </>
        );
    }
    return <Loader />;
};

export default Rooms;
