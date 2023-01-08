import React from "react";
import Header from "./components/ui/header/header";
import Main from "./components/pages/main";
import { onMainClick } from "../redux/onMainClickReducer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RoomsProvider from "./hooks/useRooms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import BookingsProvider from "./hooks/useBookings";
import CookiesMessage from "./utils/cookiesMessage/cookiesMessage";
// import Button from "./components/common/button";
// import initialize from "./mockData/initializeData";

const App = ({ onMainClick }) => {
    return (
        <AuthProvider>
            <div
                className="container"
                onClick={onMainClick}
            >
                <Header />
                <RoomsProvider>
                    <BookingsProvider>
                        <Main />
                    </BookingsProvider>
                </RoomsProvider>
                <ToastContainer />
                {/*<Button*/}
                {/*    color="blue"*/}
                {/*    onClick={initialize}*/}
                {/*>*/}
                {/*    Восстановить БД*/}
                {/*</Button>*/}
            </div>
            <CookiesMessage />
        </AuthProvider>
    );
};
App.propTypes = {
    onMainClick: PropTypes.func
};

const mapDispatchToProps = { onMainClick };

export default connect(() => ({}), mapDispatchToProps)(App);
