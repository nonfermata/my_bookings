import { connect } from "react-redux";
import Rooms from "./rooms";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";

const mapStateToProps = (state) => ({
    roomsState: state.roomsState
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

const RoomsContainer = connect(mapStateToProps, mapDispatchToProps)(Rooms);

export default RoomsContainer;
