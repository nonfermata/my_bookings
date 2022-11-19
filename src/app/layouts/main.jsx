import React, { useEffect } from "react";
import classes from "./main.module.css";
import { Route, Redirect } from "react-router-dom";
import Favourites from "./favourites/favourites";
import Admin from "./admin/admin";
import RoomPage from "../components/pages/roomPage/roomPage";
import BookingContainer from "./booking/bookingContainer";
import Login from "./login/login";
import RoomsContainer from "./rooms/roomsContainer";
import axios from "axios";
import PropTypes from "prop-types";

const Main = ({ setRoomsToState }) => {
    useEffect(() => {
        axios
            .get("http://localhost:3001/rooms")
            .then((response) => setRoomsToState(response.data));
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
                component={RoomsContainer}
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
    setRoomsToState: PropTypes.func
};

export default Main;
