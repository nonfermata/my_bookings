import React from "react";
import { Route, Redirect } from "react-router-dom";
import classes from "./main.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setRoomsToStore } from "../../redux/roomsReducer";
import { useRooms } from "../hooks/useRooms";
import routes from "./routes";

const Main = ({ setRoomsToStore }) => {
    const { rooms } = useRooms();
    setRoomsToStore(rooms);
    return (
        <div className={classes.mainContentBlock}>
            {routes.map((prop, key) => (
                <Route
                    path={prop.path}
                    component={prop.component}
                    exact={prop.exact}
                    key={key}
                />
            ))}
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

const mapDispatchToProps = { setRoomsToStore };

export default connect(() => ({}), mapDispatchToProps)(Main);
