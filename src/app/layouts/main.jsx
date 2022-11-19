import React, { useEffect } from "react";
import classes from "./main.module.css";
import { Route, Redirect } from "react-router-dom";
import Admin from "./admin/admin";
import BookingContainer from "./booking/bookingContainer";
import Login from "./login/login";
import AllRoomsContainer from "./allRooms/allRoomsContainer";
import PropTypes from "prop-types";
import FavouritesContainer from "./favourites/favouritesContainer";
import api from "../api";
import RoomPage from "../components/pages/roomPage/roomPage";
// import axios from "axios";

const Main = ({ setRoomsToState }) => {
    useEffect(() => {
        api.rooms.fetchAll().then((response) => setRoomsToState(response));
        // axios
        //     .get("http://localhost:3001/rooms")
        //     .then((response) => setRoomsToState(response.data));
    }, []);
    return (
        <div className={classes.mainContentBlock}>
            <Route
                exact
                path="/booking"
                component={BookingContainer}
            />
            <Route
                exact
                path="/rooms"
                component={AllRoomsContainer}
            />
            <Route
                path="/rooms/:roomId"
                component={RoomPage}
            />
            <Route
                path="/favourites"
                component={FavouritesContainer}
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
    setRoomsToState: PropTypes.func
};

export default Main;
