import React, { useEffect, useState } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./rooms.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import api from "../../api";

const Rooms = () => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        api.rooms.fetchAll().then((data) => setRooms(data));
    }, []);
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
