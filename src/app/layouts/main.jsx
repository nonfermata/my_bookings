import React from "react";
import { Route, Redirect } from "react-router-dom";
import classes from "./main.module.css";
import Booking from "./booking";
import Rooms from "./rooms";
import Favourites from "./favourites";
import Admin from "./admin";
import Login from "./login";
import RoomPage from "../components/pages/roomPage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setRoomsToStoreAC } from "../../redux/roomsReducer";
import { useRooms } from "../hooks/useRooms";
// import axios from "axios";
// import api from "../api";

const Main = ({ setRoomsToStore }) => {
    // useEffect(() => {
    //     api.rooms.fetchAll().then((response) => setRoomsToStore(response));
    //     axios
    //         .get("http://localhost:3001/rooms")
    //         .then((response) => setRoomsToStore(response.data));
    //
    // }, []);
    const { rooms } = useRooms();
    setRoomsToStore(rooms);
    return (
        <div className={classes.mainContentBlock}>
            <Route
                exact
                path="/booking"
                component={Booking}
            />
            <Route
                exact
                path="/rooms"
                component={Rooms}
            />
            <Route
                path="/rooms/:roomId"
                component={RoomPage}
            />
            <Route
                path="/favourites"
                component={Favourites}
            />
            <Route
                path="/admin"
                component={Admin}
            />
            <Route
                path="/login/:type?"
                component={Login}
            />
            <Redirect
                from="/"
                to="/booking"
            />
        </div>
    );
};
Main.propTypes = {
    setRoomsToStore: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    setRoomsToStore: (rooms) => {
        dispatch(setRoomsToStoreAC(rooms));
    }
});

export default connect(() => ({}), mapDispatchToProps)(Main);
