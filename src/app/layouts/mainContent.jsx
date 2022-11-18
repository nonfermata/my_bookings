import React from "react";
import classes from "./mainContent.module.css";
import { Route, Redirect } from "react-router-dom";
import Favourites from "./favourites/favourites";
import Admin from "./admin/admin";
import RoomPage from "../components/pages/roomPage/roomPage";
import Booking from "./booking/booking";
import Rooms from "./rooms/rooms";
import Login from "./login/login";

const MainContent = () => {
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

export default MainContent;
