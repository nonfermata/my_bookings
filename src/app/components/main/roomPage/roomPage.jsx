import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../utils/loader";
import ButtonBlue from "../../../utils/buttonBlue";
import classes from "./roomPage.module.css";
import CarouselBox from "../../../utils/carouselBox/carouselBox";

const RoomPage = () => {
    const history = useHistory();
    const { roomId } = useParams();
    const [room, setRoom] = useState();
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3001/rooms?id=${roomId}`)
                .then((response) => response.json())
                .then((data) => setRoom(...data));
        }, 700);
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
                    <div className={classes.buttonSize} onClick={handleAllRooms}>Назад</div>
                </ButtonBlue>
            </>
        );
    }
    return <Loader/>;
};

export default RoomPage;
