import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../common/loader/loader";
import Button from "../../common/button";
import classes from "./roomPage.module.css";
import CarouselBox from "../../ui/carouselBox/carouselBox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isFavouriteChange } from "../../../../redux/roomsReducer";
import TopButton from "../../common/topButton";
import heart from "../../common/heart";

const RoomPage = ({ rooms: roomsState, isFavouriteChange }) => {
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
    const getTopButtonSVG = () => {
        return room.isFavourite ? heart.filled : heart.contoured;
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
                        <TopButton
                            title={
                                room.isFavourite
                                    ? "Удалить из Избранного"
                                    : "Добавить в Избранное"
                            }
                            handleClick={() => isFavouriteChange(room._id)}
                            style={{
                                top: "45px",
                                right: "10px",
                                color: "var(--orange-color)",
                                backgroundColor: "transparent"
                            }}
                        >
                            {getTopButtonSVG()}
                        </TopButton>
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
    rooms: PropTypes.arrayOf(PropTypes.object),
    isFavouriteChange: PropTypes.func
};

const mapStateToProps = ({ rooms }) => ({
    rooms
});

const mapDispatchToProps = { isFavouriteChange };

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
