import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../utils/loader/loader";
import Button from "../../common/button";
import classes from "./roomPage.module.css";
import CarouselBox from "../../../utils/carouselBox/carouselBox";
import api from "../../../../my-api";
import query from "query-string";
import PropTypes from "prop-types";

const RoomPage = ({ location }) => {
    const [room, setRoom] = useState();
    const { roomId } = useParams();
    useEffect(() => {
        api.rooms.getById(roomId).then((object) => setRoom(object));
    }, []);
    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch(`http://localhost:3001/rooms?id=${roomId}`)
    //             .then((response) => response.json())
    //             .then((data) => setRoom(...data));
    //     }, 700);
    // }, []);

    const history = useHistory();
    const from = query.parse(location.search).from;
    const handleBack = () => {
        history.push("/" + from);
    };

    if (room) {
        const photosHTML = room.photos.map((photo) => (
            <div
                className={classes.imgWrap}
                key={photo.url}
            >
                <img
                    className={
                        photo.orient === "hor"
                            ? classes.imageHor
                            : classes.imageVert
                    }
                    src={photo.url}
                />
            </div>
        ));
        const getHTMLList = (prop) => {
            return room[prop].map((item) => <li key={item}>{item}</li>);
        };

        return (
            <>
                <div className={classes.roomContentWrap}>
                    <CarouselBox>{photosHTML}</CarouselBox>
                    <div className={classes.roomDescription}>
                        <div className={classes.roomHeader}>
                            <p>{room.name}</p>
                            <p className={classes.price}>{"$" + room.price + " / ночь"}</p>
                        </div>
                        <ul className={classes.briefDescriptionList}>
                            {getHTMLList("briefDescription")}
                        </ul>
                        <p className={classes.amenitiesTitle}>
                            Удобства в номере
                        </p>
                        <ul className={classes.amenitiesList}>
                            {getHTMLList("amenitiesInside")}
                        </ul>
                        <p className={classes.amenitiesTitle}>
                            Удобства общего пользования:
                        </p>
                        <ul className={classes.amenitiesList}>
                            {getHTMLList("amenitiesOutside")}
                        </ul>
                    </div>
                </div>
                <div className={classes.buttonsWrap}>
                    <Button color="blue">
                        <div
                            className={classes.buttonSize}
                            onClick={handleBack}
                        >
                            Назад
                        </div>
                    </Button>
                    <Button color="green">
                        <div
                            className={classes.buttonSize}
                            onClick={handleBack}
                        >
                            Забронировать
                        </div>
                    </Button>
                </div>
            </>
        );
    }
    return <Loader />;
};

RoomPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default RoomPage;
