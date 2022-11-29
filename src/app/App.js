import React from "react";
import Header from "./components/ui/header/header";
import Main from "./layouts/main";
import { changeState } from "../redux/onMainClickReducer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RoomsProvider from "./hooks/useRooms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ onMainClick }) => {
    return (
        <div
            className="container"
            onClick={onMainClick}
        >
            <Header />
            <RoomsProvider>
                <Main />
            </RoomsProvider>
            <ToastContainer />
        </div>
    );
};
App.propTypes = {
    onMainClick: PropTypes.func
};

const mapDispatchToProps = { changeState };

export default connect(() => ({}), mapDispatchToProps)(App);
