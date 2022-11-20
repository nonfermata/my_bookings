import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import classes from "./main.module.css";
import Admin from "./admin";
import Booking from "./booking";
import Login from "./login";
import Rooms from "./rooms";
import PropTypes from "prop-types";
import Favourites from "./favourites";
import api from "../api";
import RoomPage from "../components/pages/roomPage";
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
    setRoomsToState: PropTypes.func
};

export default Main;
