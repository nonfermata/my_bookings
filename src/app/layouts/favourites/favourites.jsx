import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./favourites.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isFavouriteChange } from "../../../redux/roomsReducer";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination/pagination";

const Favourites = ({ rooms: roomsState, isFavouriteChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rooms, setRooms] = useState();
    useEffect(() => {
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    }, []);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const pageSize = 4;
    const handleFavouriteChange = (id) => {
        isFavouriteChange(id);
        if (rooms.length - 1 === (currentPage - 1) * pageSize) {
            setCurrentPage(currentPage - 1);
        }
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    };
    if (rooms) {
        const count = rooms.length;
        const roomsCrops = paginate(rooms, currentPage, pageSize);
        return (
            <>
                <div className="mainTitle">Избранное</div>
                <div className={classes.roomsWrap}>
                    {rooms.length !== 0 ? (
                        roomsCrops.map((room) => (
                            <RoomBrief
                                key={room._id}
                                parent="favourites"
                                handleFavouriteChange={handleFavouriteChange}
                                {...room}
                            />
                        ))
                    ) : (
                        <div className={classes.noFavourites}>
                            Вы пока ничего не добавили в &quot;Избранное&quot;
                            :(
                        </div>
                    )}
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
Favourites.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object),
    isFavouriteChange: PropTypes.func
};

const mapStateToProps = ({ rooms }) => ({
    rooms
});

const mapDispatchToProps = { isFavouriteChange };

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
