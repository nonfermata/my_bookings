import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./rooms.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";
import Pagination from "../../components/common/pagination/pagination";
import { paginate } from "../../utils/paginate";

const Rooms = ({ rooms: roomsState, isFavouriteChange }) => {
    const [rooms, setRooms] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setRooms(roomsState);
    }, []);
    const handleFavouriteChange = (id) => {
        isFavouriteChange(id);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const pageSize = 4;
    if (rooms) {
        const count = rooms.length;
        const roomsCrops = paginate(rooms, currentPage, pageSize);
        return (
            <>
                <div className="mainTitle">Наши номера</div>
                <div className={classes.roomsWrap}>
                    {roomsCrops.map((room) => (
                        <RoomBrief
                            key={room._id}
                            parent="rooms"
                            handleFavouriteChange={handleFavouriteChange}
                            {...room}
                        />
                    ))}
                </div>
                <Pagination
                    count={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pageChange={handlePageChange}
                />
            </>
        );
    }
    return <Loader />;
};
Rooms.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
