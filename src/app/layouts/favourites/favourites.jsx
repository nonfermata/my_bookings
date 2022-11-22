import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./favourites.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";

const Favourites = ({ rooms: roomsState, isFavouriteChange }) => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    }, []);
    const handleFavouriteChange = (id) => {
        isFavouriteChange(id);
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    };

    if (rooms) {
        return (
            <>
                <div className="mainTitle">Избранное</div>
                <div className={classes.roomsWrap}>
                    {rooms.length !== 0 ? (
                        rooms.map((room) => (
                            <RoomBrief
                                key={room._id}
                                parent="favourites"
                                handleFavouriteChange={handleFavouriteChange}
                                {...room}
                            />
                        ))
                    ) : (
                        <div className={classes.noFavourites}>
                            Вы пока ничего сюда не добавили :(
                        </div>
                    )}
                </div>
            </>
        );
    }
    return <Loader />;
};
Favourites.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object),
    isFavouriteChange: PropTypes.func
};

const mapStateToProps = ({ rooms }) => ({
    rooms
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
