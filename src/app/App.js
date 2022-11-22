import React from "react";
import Header from "./components/ui/header/header";
import Main from "./layouts/main";
import { changeStateAC } from "../redux/onMainClickReducer";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const App = ({ onMainClick }) => {
    return (
        <div
            className="container"
            onClick={onMainClick}
        >
            <Header />
            <Main />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    onMainClick: (event) => {
        dispatch(changeStateAC(event));
    }
});
App.propTypes = {
    onMainClick: PropTypes.func
};

export default connect(() => ({}), mapDispatchToProps)(App);
