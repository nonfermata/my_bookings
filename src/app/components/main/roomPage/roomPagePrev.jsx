import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../utils/loader";
import api from "../../../../../api";
import ButtonBlue from "../../../utils/buttonBlue";
import classes from "./roomPage.module.css";

const RoomPage = () => {
    const history = useHistory();
    const { roomId } = useParams();
    const [room, setRoom] = useState();
    useEffect(() => {
        api.rooms.getById(roomId).then((object) => setRoom(object));
    }, []);
    const handleAllRooms = () => {
        history.push("/rooms");
    };

    const [photoIndex, setPhotoIndex] = useState(0);
    const handlePreviousPhoto = () => {
        if (photoIndex === 0) {
            setPhotoIndex(room.photos.length - 1);
        } else {
            setPhotoIndex(photoIndex - 1);
        }
    };
    const handleNextPhoto = () => {
        if (photoIndex === room.photos.length - 1) {
            setPhotoIndex(0);
        } else {
            setPhotoIndex(photoIndex + 1);
        }
    };
    if (room) {
        return (
            <>
                <div className="mainTitle">
                    {room.name}
                </div>
                <div className={classes.imgWrap}>
                    <div className={classes.control + " " + classes.previous} onClick={handlePreviousPhoto}>
                        &lt;
                    </div>
                    <div className={classes.control + " " + classes.next} onClick={handleNextPhoto}>
                        &gt;
                    </div>
                    <img
                        className={room.photos[photoIndex].orient === "hor" ? classes.imageHor : classes.imageVert}
                        src={room.photos[photoIndex].url}
                    />
                </div>
                <ButtonBlue>
                    <div onClick={handleAllRooms}>Назад</div>
                </ButtonBlue>
            </>
        );
    }
    return <Loader/>;
};

export default RoomPage;
