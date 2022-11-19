import { connect } from "react-redux";
import Main from "./main";
import { setRoomsToStateAC } from "../../redux/roomsReducer";

const mapDispatchToProps = (dispatch) => ({
    setRoomsToState: (rooms) => {
        dispatch(setRoomsToStateAC(rooms));
    }
});

const MainContainer = connect(() => ({}), mapDispatchToProps)(Main);

export default MainContainer;
