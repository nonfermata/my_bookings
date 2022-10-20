import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../utils/loader";
import api from "../../../api";
import ButtonBlue from "../../../utils/buttonBlue";
import classes from "./roomPage.module.css";
import CarouselBox from "../../carouselBox/carouselBox";

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

    if (room) {
        const photosHTML = room.photos.map((photo) => (
            <div className={classes.imgWrap} key={photo.url}>
                <img
                    className={photo.orient === "hor" ? classes.imageHor : classes.imageVert}
                    src={photo.url}
                />
            </div>
        ));
        return (
            <>
                <div className="mainTitle">
                    {room.name}
                </div>
                <CarouselBox>
                    {photosHTML}
                </CarouselBox>
                <ButtonBlue>
                    <div onClick={handleAllRooms}>Назад</div>
                </ButtonBlue>
            </>
        );
    }
    return <Loader/>;
};

export default RoomPage;
