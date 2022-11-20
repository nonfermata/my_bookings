import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../common/loader/loader";
import Button from "../../common/button";
import classes from "./roomPage.module.css";
import CarouselBox from "../../ui/carouselBox/carouselBox";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RoomPage = ({ rooms: roomsState }) => {
    const { roomId } = useParams();
    const [room, setRoom] = useState();
    useEffect(() => {
        setRoom(roomsState.find((room) => room._id === roomId));
    }, []);
    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    };
    const getHTMLList = (prop) => {
        return room[prop].map((item) => <li key={item}>{item}</li>);
    };

    if (room) {
        return (
            <>
                <div className={classes.roomContentWrap}>
                    <CarouselBox>
                        {room.photos.map((photo) => (
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
                        ))}
                    </CarouselBox>
                    <div className={classes.roomDescription}>
                        <div className={classes.roomHeader}>
                            <p>{room.name}</p>
                            <p className={classes.price}>
                                {"$" + room.price + " / ночь"}
                            </p>
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
                        <div className={classes.buttonSize}>Забронировать</div>
                    </Button>
                </div>
            </>
        );
    }
    return <Loader />;
};
RoomPage.propTypes = {
    booking: PropTypes.object,
    rooms: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({ rooms }) => ({
    rooms
});

export default connect(mapStateToProps)(RoomPage);
