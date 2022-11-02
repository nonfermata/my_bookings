import React from "react";
import classes from "./main.module.css";
import { Route } from "react-router-dom";
import Favourites from "./favourites/favourites";
import Admin from "./admin/admin";
import RoomPage from "./roomPage/roomPage";
import Booking from "./booking/booking";
import Rooms from "./rooms/rooms";
import Login from "./login/login";

const Main = () => {
    return (
        <div className={classes.mainContentBlock}>
            <Route path="/booking" component={Booking} />
            <Route exact path="/rooms" component={Rooms} />
            <Route path="/rooms/:roomId" component={RoomPage} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/admin" component={Admin} />
            <Route path="/login/:type?" component={Login} />
        </div>
    );
};

export default Main;
