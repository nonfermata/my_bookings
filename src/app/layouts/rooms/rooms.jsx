import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./rooms.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";

const Rooms = ({ roomsState, isFavouriteChange }) => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        setRooms(roomsState);
    }, []);
    const handleFavouriteChange = (id) => {
        isFavouriteChange(id);
    };

    if (rooms) {
        return (
            <>
                <div className="mainTitle">Наши номера</div>
                <div className={classes.roomsWrap}>
                    {rooms.map((room) => (
                        <RoomBrief
                            key={room._id}
                            parent="allRooms"
                            handleFavouriteChange={handleFavouriteChange}
                            {...room}
                        />
                    ))}
                </div>
            </>
        );
    }
    return <Loader />;
};
Rooms.propTypes = {
    roomsState: PropTypes.arrayOf(PropTypes.object),
    isFavouriteChange: PropTypes.func
};

const mapStateToProps = ({ roomsState }) => ({
    roomsState
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
